import type { Test } from './test';
import { TestRunner } from './test-runner';
import {
    TestGroupEvent,
    TestGroupEventError, TestGroupEventType, TestReporter
} from './test-reporter';

export type TestGroupRunnerFunction = () => void | Promise<void>;

export class TestGroup {
    public static current?: TestGroup;

    public readonly label: string;
    public readonly runner: TestGroupRunnerFunction;

    public readonly testsAndTestGroup: (Test | TestGroup)[] = [];

    public get totalTestCaseCount(): number {
        return this.testsAndTestGroup.reduce((accumulator, testOrTestGroup) => accumulator + testOrTestGroup.totalTestCaseCount, 0);
    }

    public get succeededTestCaseCount(): number {
        return this.testsAndTestGroup.reduce((accumulator, testOrTestGroup) => accumulator + testOrTestGroup.succeededTestCaseCount, 0);
    }

    public get failedTestCaseCount(): number {
        return this.testsAndTestGroup.reduce((accumulator, testOrTestGroup) => accumulator + testOrTestGroup.failedTestCaseCount, 0);
    }

    public get succeeded(): boolean {
        return this.testsAndTestGroup.every(testOrTestGroup => testOrTestGroup.succeeded);
    }

    public get failed(): boolean {
        return !this.succeeded;
    }

    public constructor(label: string, runner: TestGroupRunnerFunction) {
        this.label = label;
        this.runner = runner;
    }

    public async run(): Promise<void> {
        await this.withCurrentAsync(TestGroup.current, async () => {
            try {
                TestReporter.emit(new TestGroupEvent(TestGroupEventType.Start, this));

                await this.runner();

                for (const currentTestOrTestGroup of this.testsAndTestGroup) {
                    // eslint-disable-next-line no-await-in-loop
                    await currentTestOrTestGroup.run();
                }

                TestReporter.emit(new TestGroupEvent(TestGroupEventType.End, this));
            }
            catch (error: unknown) {
                TestReporter.emit(new TestGroupEventError(this, 'Unexpected Error in TestGroup', error));
            }
        });
    }

    public withCurrent<TResult>(previousTestGroup: TestGroup | undefined, method: () => TResult): TResult {
        TestGroup.current = this;

        const result = method();

        TestGroup.current = previousTestGroup;

        return result;
    }

    public async withCurrentAsync<TResult>(previousTestGroup: TestGroup | undefined, method: () => Promise<TResult>): Promise<TResult> {
        TestGroup.current = this;

        const result = await method();

        // eslint-disable-next-line require-atomic-updates
        TestGroup.current = previousTestGroup;

        return result;
    }

    public addTest(test: Test): void;
    public addTest(newTest: Test): void {
        this.testsAndTestGroup.push(newTest);
    }

    public addTestGroup(testGroup: TestGroup): void;
    public addTestGroup(newTestGroup: TestGroup): void {
        this.testsAndTestGroup.push(newTestGroup);
    }
}

export function testGroup(label: string, runner: TestGroupRunnerFunction): void | Promise<void> {
    const newTestGroup = new TestGroup(label, runner);

    if (TestGroup.current !== undefined) {
        TestGroup.current.addTestGroup(newTestGroup);

        return;
    }

    if (TestRunner.current !== undefined) {
        TestRunner.current.addTestGroup(newTestGroup);

        return;
    }

    throw new Error('Can not add Test Group. No TestRunner available.');
}
