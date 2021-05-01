import type { Test } from './test';
import type { TestCase } from './test-case';
import type { TestSuite } from './test-suite';

export class TestRunner {
    public static current?: TestRunner;

    public readonly filePaths: string[];
    public readonly testSuites: TestSuite[] = [];
    public readonly tests: Test[] = [];
    public readonly testCases: TestCase<unknown[]>[] = [];

    public constructor(filePaths: string[] = []) {
        this.filePaths = filePaths;
    }

    public async collect(): Promise<void> {
        TestRunner.current = this;

        const promises: Promise<unknown>[] = [];

        for (const filePath of this.filePaths) {
            promises.push(import(filePath));
        }

        await Promise.all(promises);

        TestRunner.current = undefined;
    }
}
