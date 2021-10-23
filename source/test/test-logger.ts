/* eslint-disable no-console */

import {
    isError, toDisplayString
} from '@colonise/utilities';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class TestLogger {
    public static depth: number = 0;
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    public static tabSize: number = 2;

    public static write(message: string): void {
        process.stdout.write(`${' '.repeat(TestLogger.depth * TestLogger.tabSize)}${message}`);
    }

    public static writeLine(message: string): void {
        process.stdout.write(`${' '.repeat(TestLogger.depth * TestLogger.tabSize)}${message}`);
    }

    public static error(message: string, error: unknown): void {
        process.stderr.write(`${message}: ${isError(error) ? error.message : toDisplayString(error)}`);
    }

    public static indent(method: () => void): void;
    public static indent<T>(method: () => T): T;
    public static indent<T>(method: () => T): T {
        TestLogger.depth += 1;

        const result = method();

        TestLogger.depth -= 1;

        return result;
    }

    public static async asyncIndent(method: () => Promise<void>): Promise<void>;
    public static async asyncIndent<T>(method: () => Promise<T>): Promise<T>;
    public static async asyncIndent<T>(method: () => Promise<T>): Promise<T> {
        TestLogger.depth += 1;

        const result = await method();

        TestLogger.depth -= 1;

        return result;
    }
}
