import type { Test } from './test';
import type { TestGroup } from './test-group';
import {
    TestReporter, TestRunnerEvent, TestRunnerEventError, TestRunnerEventType
} from './test-reporter';

export class TestRunner {
    public static current?: TestRunner;

    public readonly testReporter: TestReporter;
    public readonly filePaths: string[];
    public readonly testsAndTestGroup: (Test | TestGroup)[] = [];

    public get totalTestCaseCount(): number {
        return this.testsAndTestGroup.reduce((accumulator, testOrTestGroup) => accumulator + testOrTestGroup.totalTestCaseCount, 0);
    }

    public get erroredTestCaseCount(): number {
        return this.testsAndTestGroup.reduce((accumulator, testOrTestGroup) => accumulator + testOrTestGroup.erroredTestCaseCount, 0);
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

    public constructor(testReporter: TestReporter, filePaths: string[] = []) {
        this.testReporter = testReporter;
        this.filePaths = filePaths;
    }

    public async collect(): Promise<void> {
        if (TestRunner.current !== undefined) {
            throw new Error('TestRunner already exists.');
        }

        await this.asyncWithCurrent(async () => {
            TestReporter.emit(new TestRunnerEvent(TestRunnerEventType.CollectStart, this));

            const promises: Promise<unknown>[] = [];

            for (const filePath of this.filePaths) {
                promises.push(import(filePath).catch((error: unknown) => {
                    TestReporter.emit(new TestRunnerEventError(this, 'Unexpected Error in Test Runner', error));
                }));
            }

            await Promise.all(promises);

            TestReporter.emit(new TestRunnerEvent(TestRunnerEventType.CollectEnd, this));
        });
    }

    public async run(): Promise<void> {
        await this.asyncWithCurrent(async () => {
            TestReporter.emit(new TestRunnerEvent(TestRunnerEventType.Start, this));

            for (const testOrTestGroup of this.testsAndTestGroup) {
                // eslint-disable-next-line no-await-in-loop
                await testOrTestGroup.run();
            }

            TestReporter.emit(new TestRunnerEvent(TestRunnerEventType.End, this));
        });
    }

    public withCurrent<TResult>(method: () => TResult): TResult {
        TestRunner.current = this;

        const result = method();

        TestRunner.current = undefined;

        return result;
    }

    public async asyncWithCurrent<TResult>(method: () => Promise<TResult>): Promise<TResult> {
        TestRunner.current = this;
        TestReporter.current = this.testReporter;

        const result = await method();

        TestRunner.current = undefined;
        TestReporter.current = undefined;

        return result;
    }

    public addTest(test: Test): void;
    public addTest(newTest: Test): void {
        this.testsAndTestGroup.push(newTest);
    }

    public addTestGroup(testGroup: TestGroup): void
    public addTestGroup(newTestGroup: TestGroup): void {
        this.testsAndTestGroup.push(newTestGroup);
    }
}
