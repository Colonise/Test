import type { UnknownAssertionResult } from '../assert';

export class TestCase<TValue = unknown> {
    public static current: TestCase | undefined = undefined;

    public readonly label: string | undefined;
    public readonly value: TValue;

    public readonly assertionResults: UnknownAssertionResult[] = [];

    public get succeeded(): boolean {
        return this.assertionResults.every(assertionResult => assertionResult.succeeded);
    }

    public get failed(): boolean {
        return !this.succeeded;
    }

    public constructor(label: string | undefined, value: TValue) {
        this.label = label;
        this.value = value;
    }

    public withCurrent<TResult>(method: () => TResult): TResult {
        TestCase.current = <TestCase><unknown>this;

        const result = method();

        TestCase.current = undefined;

        return result;
    }

    public async withCurrentAsync<TResult>(method: () => Promise<TResult>): Promise<TResult> {
        TestCase.current = <TestCase><unknown>this;

        const result = await method();

        // eslint-disable-next-line require-atomic-updates
        TestCase.current = undefined;

        return result;
    }

    public addAssertionResult(assertionResult: UnknownAssertionResult): void {
        this.assertionResults.push(assertionResult);
    }
}

type TestCaseArguments<TValue> =
    | [
        value: TValue
    ]
    | [
        label: string,
        value: TValue
    ];

export function testCase<TValue = unknown>(
    value: TValue
): TestCase<TValue>;
export function testCase<TValue = unknown>(
    label: string,
    value: TValue
): TestCase<TValue>;
export function testCase<TValue = unknown>(...typedArguments: TestCaseArguments<TValue>): TestCase<TValue> {
    if (typedArguments.length === 1) {
        const [
            value
        ] = typedArguments;

        return new TestCase(undefined, value);
    }
    // eslint-disable-next-line no-else-return
    else {
        const [
            label,
            value
        ] = typedArguments;

        return new TestCase(label, value);
    }
}
