import type { Test } from './test';
import type { TestCase } from './test-case';
import { TestRunner } from './test-runner';
import { toDisplayValue } from '../utilities';

export class TestSuite {
    public static current?: TestSuite;

    public readonly name: string;
    public readonly runner: () => void;

    public readonly tests: Test[] = [];
    public readonly testCases: TestCase<unknown[]>[] = [];

    public constructor(name: string, runner: () => void) {
        this.name = name;
        this.runner = runner;
    }

    public run(): void {
        TestSuite.current = this;

        try {
            console.log(`Test Suite: ${this.name}`);

            this.runner();
        }
        catch (error: unknown) {
            console.error(`Caught unexpected error while running a Test Suite. ${toDisplayValue(error)}`);
        }

        TestSuite.current = undefined;
    }
}

export function testSuite(name: string, runner: () => void): void {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const testSuite = new TestSuite(name, runner);

    if (TestRunner.current) {
        TestRunner.current.testSuites.push(testSuite);
    }
}
