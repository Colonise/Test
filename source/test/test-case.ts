import { Test } from './test';
import { TestRunner } from './test-runner';
import { TestSuite } from './test-suite';

export class TestCase<TParameters extends unknown[]> {
    public static current?: TestCase<unknown[]>;

    public readonly name: string;
    public readonly parameters: TParameters;

    public constructor(name: string, parameters: TParameters) {
        this.name = name;
        this.parameters = parameters;
    }
}

export function testCase<TParameters extends unknown[]>(name: string, parameters: TParameters): void {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const testCase = new TestCase(name, parameters);

    if (TestRunner.current) {
        TestRunner.current.testCases.push(testCase);
    }

    if (TestSuite.current) {
        TestSuite.current.testCases.push(testCase);
    }

    if (Test.current) {
        Test.current.testCases.push(testCase);
    }
}
