import { TestCase } from './test-case';
import { TestGroup } from './test-group';
import { TestRunner } from './test-runner';
import type { UnknownAssertionResult } from '../assert';
import {
    TestCaseEvent, TestCaseEventType, TestEvent, TestEventError, TestEventType, TestReporter
} from './test-reporter';

export type TestRunnerFunction<TTestCaseValue = unknown> = ((testCase?: TTestCaseValue) => void | Promise<void>);

export type TestFunction<TTestCaseValue = unknown> = (
    label: string,
    testCases: TestCase<TTestCaseValue>[],
    runner: TestRunnerFunction<TTestCaseValue>
) => void | Promise<void>;

export class Test<TTestCaseValue = unknown> {
    public static current: Test | undefined = undefined;

    public readonly label: string;
    public readonly testCases: TestCase<TTestCaseValue>[];
    public readonly runner: TestRunnerFunction<TTestCaseValue>;

    public readonly assertionResults: UnknownAssertionResult[] = [];

    public get totalTestCaseCount(): number {
        return this.testCases.length > 0
            ? this.testCases.length
            : 1;
    }

    public get succeededTestCaseCount(): number {
        if (this.testCases.length > 0) {
            return this.testCases.filter(testCase => testCase.succeeded).length;
        }

        return this.succeeded
            ? 1
            : 0;
    }

    public get failedTestCaseCount(): number {
        if (this.testCases.length > 0) {
            return this.testCases.filter(testCase => testCase.failed).length;
        }

        return this.failed
            ? 1
            : 0;
    }

    public get succeeded(): boolean {
        return this.assertionResults.every(assertionResult => assertionResult.succeeded) && this.testCases.every(assertionResult => assertionResult.succeeded);
    }

    public get failed(): boolean {
        return !this.succeeded;
    }

    public constructor(
        label: string,
        testCases: TestCase<TTestCaseValue>[],
        runner: TestRunnerFunction<TTestCaseValue>
    ) {
        this.label = label;
        this.testCases = testCases;
        this.runner = runner;
    }

    public async run(): Promise<void> {
        if (Test.current !== undefined) {
            throw new Error(`Test '${Test.current.label}' already running.`);
        }

        await this.withCurrentAsync(async () => {
            try {
                TestReporter.emit(new TestEvent(TestEventType.Start, <Test>this));

                if (this.testCases.length > 0) {
                    // eslint-disable-next-line guard-for-in, @typescript-eslint/no-for-in-array
                    for (const testCaseIndex in this.testCases) {
                        const testCase = this.testCases[testCaseIndex];

                        // eslint-disable-next-line no-await-in-loop
                        await testCase.withCurrentAsync(async () => {
                            TestReporter.emit(new TestCaseEvent(TestCaseEventType.Start, testCase));

                            await this.runner(testCase.value);

                            TestReporter.emit(new TestCaseEvent(TestCaseEventType.End, testCase));
                        });
                    }
                }
                else {
                    await this.runner();
                }

                TestReporter.emit(new TestEvent(TestEventType.End, <Test>this));
            }
            catch (error: unknown) {
                TestReporter.emit(new TestEventError(<Test>this, 'Unexpected Error in Test', error));
            }
        });
    }

    public withCurrent<TResult>(method: () => TResult): TResult {
        Test.current = <Test><unknown>this;

        const result = method();

        Test.current = undefined;

        return result;
    }

    public async withCurrentAsync<TResult>(method: () => Promise<TResult>): Promise<TResult> {
        Test.current = <Test><unknown>this;

        const result = await method();

        // eslint-disable-next-line require-atomic-updates
        Test.current = undefined;

        return result;
    }

    public addAssertionResult(assertionResult: UnknownAssertionResult): void {
        this.assertionResults.push(assertionResult);
    }
}

type TestArguments<TTestCaseValue> =
    | [
        label: string,
        runner: () => void
    ]
    | [
        label: string,
        testCases: (TTestCaseValue | TestCase<TTestCaseValue>)[],
        runner: (testCase?: TTestCaseValue) => void
    ];

// eslint-disable-next-line @typescript-eslint/no-shadow
export function test(
    label: string,
    runner: () => void
): void | Promise<void>;
export function test<TTestCaseValue = unknown>(
    label: string,
    testCases: (TTestCaseValue | TestCase<TTestCaseValue>)[],
    runner: (testCase: TTestCaseValue) => void
): void | Promise<void>;
export function test<TTestCase = unknown>(...typedArguments: TestArguments<TTestCase>): void | Promise<void> {
    let newTest: Test;
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (typedArguments.length === 2) {
        const [
            label,
            runner
        ] = typedArguments;

        newTest = <Test><unknown>(new Test(label, [], runner));
    }
    else {
        const [
            label,
            testCases,
            runner
        ] = typedArguments;

        newTest = <Test><unknown>(
            new Test(
                label,
                testCases.map(testCaseValueOrTestCase => {
                    if (testCaseValueOrTestCase instanceof TestCase) {
                        return testCaseValueOrTestCase;
                    }

                    return new TestCase(undefined, testCaseValueOrTestCase);
                }),
                runner
            ));
    }

    if (TestGroup.current !== undefined) {
        TestGroup.current.addTest(newTest);

        return;
    }

    if (TestRunner.current !== undefined) {
        TestRunner.current.addTest(newTest);

        return;
    }

    throw new Error('Can not add Test. No TestRunner available.');
}
