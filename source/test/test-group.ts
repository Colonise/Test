// eslint-disable-next-line @typescript-eslint/no-shadow
import { test } from './test';
import { TestRunner } from './test-runner';
import { toDisplayString } from '@colonise/utilities';
import type {
    Test, TestRunnerFunction
} from './test';

export type TestGroupRunnerFunction = (
    test: <TTestCase = never>(
        label: string,
        testCases: TTestCase[],
        runner: TestRunnerFunction<TTestCase>
    ) => void | Promise<void>
) => void | Promise<void>;

export class TestGroup {
    public static current?: TestGroup;

    public readonly label: string;
    public readonly runner: TestGroupRunnerFunction;

    public readonly testGroups: TestGroup[] = [];
    public readonly tests: Test[] = [];

    public constructor(label: string, runner: TestGroupRunnerFunction) {
        this.label = label;
        this.runner = runner;
    }

    public async run(): Promise<void> {
        const previousTestGroup = TestGroup.current;

        TestGroup.current = this;

        try {
            console.log(`Test Group: ${this.label}`);

            await this.runner(test);
        }
        catch (error: unknown) {
            console.error(`Caught unexpected error while running a Test Group. ${toDisplayString(error)}`);
        }

        // eslint-disable-next-line require-atomic-updates
        TestGroup.current = previousTestGroup;
    }

    public addTestGroup(testGroup: TestGroup): void;
    public addTestGroup(newTestGroup: TestGroup): void {
        this.testGroups.push(newTestGroup);
    }

    public addTest(test: Test): void;
    public addTest(newTest: Test): void {
        this.tests.push(newTest);
    }
}

export function testGroup(label: string, runner: TestGroupRunnerFunction): void | Promise<void> {
    const newTestGroup = new TestGroup(label, runner);

    if (TestGroup.current !== undefined) {
        TestGroup.current.addTestGroup(newTestGroup);
    }
    else if (TestRunner.current !== undefined) {
        TestRunner.current.addTestGroup(newTestGroup);
    }
}
