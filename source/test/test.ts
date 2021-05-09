import { TestGroup } from './test-group';
import { toDisplayString } from '@colonise/utilities';

export type TestRunnerFunction<TTestCase = never> = (testCase: TTestCase) => void | Promise<void>;

export type TestFunction<TTestCase = never> = (
    label: string,
    testCases: TTestCase[],
    runner: TestRunnerFunction<TTestCase>
) => void | Promise<void>;

export class Test<TTestCase = never> {
    public static current: Test | undefined = undefined;

    public readonly label: string;
    public readonly testCases: TTestCase[];
    public readonly runner: TestRunnerFunction<TTestCase>;

    public constructor(
        label: string,
        testCases: TTestCase[],
        runner: TestRunnerFunction<TTestCase>
    ) {
        this.label = label;
        this.testCases = testCases;
        this.runner = runner;
    }

    public async run(): Promise<void> {
        if (Test.current !== undefined) {
            throw new Error(`Test '${Test.current.label}' already running.`);
        }

        Test.current = <Test><unknown>this;

        try {
            console.log(`Test: ${this.label}`);

            for (const testCase of this.testCases) {
                // eslint-disable-next-line no-await-in-loop
                await this.runner(testCase);
            }
        }
        catch (error: unknown) {
            console.error(`Caught unexpected error while running a Test. ${toDisplayString(error)}`);
        }

        Test.current = undefined;
    }
}

type TestArguments<TTestCase> =
    | [
        label: string,
        runner: (testCase: TTestCase) => void
    ]
    | [
        label: string,
        testCases: TTestCase[],
        runner: (testCase: TTestCase) => void
    ];

// eslint-disable-next-line @typescript-eslint/no-shadow
export function test<TTestCase = never>(
    label: string,
    runner: (testCase: TTestCase) => void
): void | Promise<void>;
export function test<TTestCase = never>(
    label: string,
    testCases: TTestCase[],
    runner: (testCase: TTestCase) => void
): void | Promise<void>;
export function test<TTestCase = never>(...typedArguments: TestArguments<TTestCase>): void | Promise<void> {
    if (TestGroup.current !== undefined) {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        if (typedArguments.length === 2) {
            const [
                label,
                runner
            ] = typedArguments;

            TestGroup.current.addTest(<Test><unknown>(new Test(label, [], runner)));
        }
        else {
            const [
                label,
                testCases,
                runner
            ] = typedArguments;

            TestGroup.current.addTest(<Test><unknown>(new Test(label, testCases, runner)));
        }
    }
}
