import type { TestGroup } from './test-group';

export class TestRunner {
    public static current?: TestRunner;

    public readonly filePaths: string[];
    public readonly testGroups: TestGroup[] = [];

    public constructor(filePaths: string[] = []) {
        this.filePaths = filePaths;
    }

    public async collect(): Promise<void> {
        if (TestRunner.current !== undefined) {
            throw new Error('TestRunner already exists.');
        }

        TestRunner.current = this;

        const promises: Promise<unknown>[] = [];

        for (const filePath of this.filePaths) {
            promises.push(import(filePath));
        }

        await Promise.all(promises);

        // eslint-disable-next-line require-atomic-updates
        TestRunner.current = undefined;
    }

    public async run(): Promise<void> {
        for (const testGroup of this.testGroups) {
            // eslint-disable-next-line no-await-in-loop
            await testGroup.run();
        }
    }

    public addTestGroup(testGroup: TestGroup): void {
        this.testGroups.push(testGroup);
    }
}
