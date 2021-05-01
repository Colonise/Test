import type { TestCase } from './test-case';
import { TestRunner } from './test-runner';
import { toDisplayValue } from '../utilities';
import { TestSuite } from './test-suite';

export class Test {
    public static current?: Test;

    public readonly name: string;
    public readonly runner: () => void;

    public readonly testCases: TestCase<unknown[]>[] = [];

    public constructor(name: string, runner: () => void) {
        this.name = name;
        this.runner = runner;
    }

    public run(): void {
        Test.current = this;

        try {
            console.log(`Test: ${this.name}`);

            this.runner();
        }
        catch (error: unknown) {
            console.error(`Caught unexpected error while running a Test. ${toDisplayValue(error)}`);
        }

        Test.current = undefined;
    }
}

// eslint-disable-next-line @typescript-eslint/no-shadow
export function test(name: string, runner: () => void): void {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const test = new Test(name, runner);

    if (TestRunner.current) {
        TestRunner.current.tests.push(test);
    }

    if (TestSuite.current) {
        TestSuite.current.tests.push(test);
    }
}
