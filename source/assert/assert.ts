import { anything } from './anything';
import { AssertionResult } from './assertion-result';
import type { Constructor } from '@colonise/utilities';
import {
    isFunction, toBoolean
} from '@colonise/utilities';

class Assert<TSubject> {
    public readonly subject: TSubject;

    public constructor (subject: TSubject) {
        this.subject = subject;
    }

    public custom<TActual, TExpected>(
        actual: TActual,
        expected: TExpected,
        asserter: (subject: TSubject, actual: TActual, expected: TExpected) => boolean,
        message: string
    ): AssertionResult<TSubject, TActual, TExpected>;
    public custom<TActual, TExpected>(
        actual: TActual,
        expected: TExpected,
        asserter: (subject: TSubject, actual: TActual, expected: TExpected) => boolean,
        message: string,
        reverse: boolean
    ): AssertionResult<TSubject, TActual, TExpected>;
    public custom<TActual, TExpected>(
        actual: TActual,
        expected: TExpected,
        result: boolean,
        message: string
    ): AssertionResult<TSubject, TActual, TExpected>;
    public custom<TActual, TExpected>(
        actual: TActual,
        expected: TExpected,
        result: boolean,
        message: string,
        reverse: boolean
    ): AssertionResult<TSubject, TActual, TExpected>;
    // eslint-disable-next-line max-params
    public custom<TActual, TExpected>(
        actual: TActual,
        expected: TExpected,
        resultOrAsserter: boolean | ((subject: TSubject, actual: TActual, expected: TExpected) => boolean),
        message: string,
        reverse: boolean = false
    ): AssertionResult<TSubject, TActual, TExpected> {
        return new AssertionResult(
            this.subject,
            actual,
            expected,
            reverse,
            isFunction(resultOrAsserter) ? resultOrAsserter(this.subject, actual, expected) : resultOrAsserter,
            message
        );
    }

    public equals<TExpected extends TSubject>(expected: TExpected): AssertionResult<TSubject, TSubject, TExpected>;
    public equals<TExpected extends TSubject>(
        expected: TExpected,
        reverse: boolean
    ): AssertionResult<TSubject, TSubject, TExpected>;
    public equals(expected: unknown, reverse: boolean = false): AssertionResult<unknown, unknown, unknown> {
        // eslint-disable-next-line eqeqeq
        return this.custom(this.subject, expected, this.subject == expected, 'Expected %subject% to %reverse=not %equal %expected%.', reverse);
    }

    public striclyEquals<TExpected extends TSubject>(expected: TExpected): AssertionResult<TSubject, TSubject, TExpected>;
    public striclyEquals<TExpected extends TSubject>(
        expected: TExpected,
        reverse: boolean
    ): AssertionResult<TSubject, TSubject, TExpected>;
    public striclyEquals(expected: unknown, reverse: boolean = false): AssertionResult<unknown, unknown, unknown> {
        return this.custom(this.subject, expected, this.subject === expected, 'Expected %subject% to %reverse=not %stricly equal %expected%.', reverse);
    }

    public isTypeOf(expected: 'string'): AssertionResult<TSubject, TSubject, string>;
    public isTypeOf(expected: 'number'): AssertionResult<TSubject, TSubject, number>;
    public isTypeOf(expected: 'bigint'): AssertionResult<TSubject, TSubject, bigint>;
    public isTypeOf(expected: 'boolean'): AssertionResult<TSubject, TSubject, boolean>;
    public isTypeOf(expected: 'symbol'): AssertionResult<TSubject, TSubject, symbol>;
    public isTypeOf(expected: 'undefined'): AssertionResult<TSubject, TSubject, undefined>;
    // eslint-disable-next-line @typescript-eslint/ban-types
    public isTypeOf(expected: 'object'): AssertionResult<TSubject, TSubject, object>;
    // eslint-disable-next-line @typescript-eslint/ban-types
    public isTypeOf(expected: 'function'): AssertionResult<TSubject, TSubject, Function>;
    public isTypeOf(expected: 'string', reverse: boolean): AssertionResult<TSubject, TSubject, string>;
    public isTypeOf(expected: 'number', reverse: boolean): AssertionResult<TSubject, TSubject, number>;
    public isTypeOf(expected: 'bigint', reverse: boolean): AssertionResult<TSubject, TSubject, bigint>;
    public isTypeOf(expected: 'boolean', reverse: boolean): AssertionResult<TSubject, TSubject, boolean>;
    public isTypeOf(expected: 'symbol', reverse: boolean): AssertionResult<TSubject, TSubject, symbol>;
    public isTypeOf(expected: 'undefined', reverse: boolean): AssertionResult<TSubject, TSubject, undefined>;
    // eslint-disable-next-line @typescript-eslint/ban-types
    public isTypeOf(expected: 'object', reverse: boolean): AssertionResult<TSubject, TSubject, object>;
    // eslint-disable-next-line @typescript-eslint/ban-types
    public isTypeOf(expected: 'function', reverse: boolean): AssertionResult<TSubject, TSubject, Function>;
    public isTypeOf(expected: string, reverse: boolean = false): AssertionResult<unknown, unknown, unknown> {
        switch (expected) {
            case 'string':
                return this.custom(this.subject, expected, typeof this.subject === expected, 'Expected %subject% to %reverse=not %be a string.', reverse);

            case 'number':
                return this.custom(this.subject, expected, typeof this.subject === expected, 'Expected %subject% to %reverse=not %be a number.', reverse);

            case 'bigint':
                return this.custom(this.subject, expected, typeof this.subject === expected, 'Expected %subject% to %reverse=not %be a BigInt.', reverse);

            case 'boolean':
                return this.custom(this.subject, expected, typeof this.subject === expected, 'Expected %subject% to %reverse=not %be a boolean.', reverse);

            case 'symbol':
                return this.custom(this.subject, expected, typeof this.subject === expected, 'Expected %subject% to %reverse=not %be a symbol.', reverse);

            case 'undefined':
                return this.custom(this.subject, expected, typeof this.subject === expected, 'Expected %subject% to %reverse=not %be undefined.', reverse);

            case 'object':
                return this.custom(this.subject, expected, typeof this.subject === expected, 'Expected %subject% to %reverse=not %be an object.', reverse);

            case 'function':
                return this.custom(this.subject, expected, typeof this.subject === expected, 'Expected %subject% to %reverse=not %be a function.', reverse);

            default: {
                return this.custom(expected, undefined, false, 'Expected %subject% to be "string", "number", "bigint", "boolean", "symbol", "undefined", "object", or "function", but got %expected%.');
            }
        }
    }

    public isAnInstanceOf<TExpected>(
        expected: TExpected
    ): AssertionResult<TSubject, TSubject, TExpected>;
    public isAnInstanceOf<TExpected>(
        expected: TExpected,
        reverse: boolean
    ): AssertionResult<TSubject, TSubject, TExpected>;
    public isAnInstanceOf(expected: Constructor, reverse: boolean = false): AssertionResult<unknown, unknown, unknown> {
        return this.custom(this.subject, expected, this.subject instanceof expected, 'Expected %subject% to %reverse=not %be an instance of %expected%.', reverse);
    }

    public isTrue(): AssertionResult<TSubject, TSubject, true>;
    public isTrue(reverse: boolean): AssertionResult<TSubject, TSubject, true>;
    public isTrue(reverse: boolean = false): AssertionResult<unknown, unknown, true> {
        const isTypeOfResult = this.isTypeOf('boolean');

        if (!isTypeOfResult.result) {
            // @ts-expect-error
            return isTypeOfResult;
        }

        // eslint-disable-next-line @typescript-eslint/naming-convention
        const booleanSubject = <boolean><unknown>this.subject;

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
        return this.custom(this.subject, true, booleanSubject === true, 'Expected %subject% to %reverse=not %be true.', reverse);
    }

    public isFalse(): AssertionResult<TSubject, TSubject, false>;
    public isFalse(reverse: boolean): AssertionResult<TSubject, TSubject, false>;
    public isFalse(reverse: boolean = false): AssertionResult<unknown, unknown, false> {
        const isTypeOfResult = this.isTypeOf('boolean');

        if (!isTypeOfResult.result) {
            // @ts-expect-error
            return isTypeOfResult;
        }

        // eslint-disable-next-line @typescript-eslint/naming-convention
        const booleanSubject = <boolean><unknown>this.subject;

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
        return this.custom(this.subject, false, booleanSubject === false, 'Expected %subject% to %reverse=not %be false.', reverse);
    }

    public isTruthy(): AssertionResult<TSubject, TSubject, never>;
    public isTruthy(reverse: boolean): AssertionResult<TSubject, TSubject, never>;
    public isTruthy(reverse: boolean = false): AssertionResult<unknown, unknown, unknown> {
        return this.custom(this.subject, undefined, toBoolean(this.subject), 'Expected %subject% to %reverse=not %be truthy.', reverse);
    }

    public isFalsey(): AssertionResult<TSubject, TSubject, never>;
    public isFalsey(reverse: boolean): AssertionResult<TSubject, TSubject, never>;
    public isFalsey(reverse: boolean = false): AssertionResult<unknown, unknown, unknown> {
        return this.custom(this.subject, undefined, !toBoolean(this.subject), 'Expected %subject% to %reverse=not %be falsey.', reverse);
    }

    public isDefined(): AssertionResult<TSubject, TSubject, never>;
    public isDefined(reverse: boolean): AssertionResult<TSubject, TSubject, never>;
    public isDefined(reverse: boolean = false): AssertionResult<unknown, unknown, unknown> {
        return this.custom(this.subject, undefined, this.subject !== null && this.subject !== undefined, 'Expected %subject% to %reverse=not %be defined.', reverse);
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    public isNull(): AssertionResult<TSubject, TSubject, null>;
    // eslint-disable-next-line @typescript-eslint/ban-types
    public isNull(reverse: boolean): AssertionResult<TSubject, TSubject, null>;
    // eslint-disable-next-line @typescript-eslint/ban-types
    public isNull(reverse: boolean = false): AssertionResult<unknown, unknown, null> {
        return this.custom(this.subject, null, this.subject === null, 'Expected %subject% to %reverse=not %be null.', reverse);
    }

    public isUndefined(): AssertionResult<TSubject, TSubject, undefined>;
    public isUndefined(reverse: boolean): AssertionResult<TSubject, TSubject, undefined>;
    public isUndefined(reverse: boolean = false): AssertionResult<unknown, unknown, undefined> {
        return this.custom(this.subject, undefined, this.subject === undefined, 'Expected %subject% to %reverse=not %be undefined.', reverse);
    }

    public isIn<TExpected extends object>(expected: TExpected): AssertionResult<TSubject, TSubject, TExpected>;
    public isIn<TExpected extends object>(
        expected: TExpected,
        reverse: boolean
    ): AssertionResult<TSubject, TSubject, TExpected>;
    public isIn(expected: string, reverse: boolean = false): AssertionResult<unknown, unknown, unknown> {
        const isDefinedResult = this.isDefined();

        if (!isDefinedResult.result) {
            return isDefinedResult;
        }

        const objectExpected = <{ [key: string]: unknown; }><unknown>expected;

        return this.custom(this.subject, expected, this.subject in objectExpected, 'Expected %expected% to %reverse=not %be in %subject%.', reverse);
    }

    public returns<TExpected>(): AssertionResult<TSubject, unknown, TExpected>;
    public returns<TExpected>(expected: TExpected): AssertionResult<TSubject, unknown, TExpected>;
    public returns<TExpected>(expected: TExpected, reverse: boolean): AssertionResult<TSubject, unknown, TExpected>;
    public returns(expected: unknown = anything, reverse: boolean = false): AssertionResult<unknown, unknown, unknown> {
        const isTypeOfResult = this.isTypeOf('function');

        if (!isTypeOfResult.result) {
            return isTypeOfResult;
        }

        const functionSubject = <() => unknown><unknown>this.subject;

        if (expected === anything) {
            try {
                const actual = functionSubject();

                return this.custom(actual, expected, !reverse, 'Expected %subject% to %reverse=not %return%failed=, but it returned %actual%%.', reverse);
            }
            catch (actual: unknown) {
                return this.custom(actual, expected, !reverse, 'Expected %subject% to %reverse=not %return%failed=, but it threw %actual%%.', reverse);
            }
        }
        else {
            try {
                const actual = functionSubject();

                return this.custom(actual, expected, actual === expected, 'Expected %subject% to %reverse=not %return %expected%%failed=, but it returned %actual%%.', reverse);
            }
            catch (actual: unknown) {
                return this.custom(actual, expected, false, 'Expected %subject% to %reverse=not %return %expected%, but it threw %actual%.', reverse);
            }
        }
    }

    public throws<TExpected>(): AssertionResult<TSubject, unknown, TExpected>;
    public throws<TExpected>(expected: TExpected): AssertionResult<TSubject, unknown, TExpected>;
    public throws<TExpected>(expected: TExpected, reverse: boolean): AssertionResult<TSubject, unknown, TExpected>;
    public throws(expected: unknown = anything, reverse: boolean = false): AssertionResult<unknown, unknown, unknown> {
        const isTypeOfResult = this.isTypeOf('function');

        if (!isTypeOfResult.result) {
            return isTypeOfResult;
        }

        const functionSubject = <() => unknown><unknown>this.subject;

        if (expected === anything) {
            try {
                const actual = functionSubject();

                return this.custom(actual, expected, !reverse, 'Expected %subject% to %reverse=not %throw %expected%%failed=, but it returned %actual%%.', reverse);
            }
            catch (actual: unknown) {
                return this.custom(actual, expected, !reverse, 'Expected %subject% to %reverse=not %throw %expected%%failed=, but it threw %actual%%.', reverse);
            }
        }
        else {
            try {
                const actual = functionSubject();

                return this.custom(actual, expected, false, 'Expected %subject% to %reverse=not %throw %expected%, but it returned %actual%.', reverse);
            }
            catch (actual: unknown) {
                return this.custom(actual, expected, actual === expected, 'Expected %subject% to %reverse=not %throw %expected%%failed=, but it threw %actual%%.', reverse);
            }
        }
    }

    public async resolves(): Promise<AssertionResult<TSubject, unknown, unknown>>;
    public async resolves<TExpected>(expected: TExpected): Promise<AssertionResult<TSubject, unknown, TExpected>>;
    public async resolves<TExpected>(expected: TExpected, reverse: boolean): Promise<AssertionResult<TSubject, unknown, TExpected>>;
    public async resolves(expected: unknown = anything, reverse: boolean = false): Promise<AssertionResult<unknown, unknown, unknown>> {
        const isInResult = new Assert('then').isIn(<object><unknown>this.subject);

        if (!isInResult.result) {
            return isInResult;
        }

        const promiseSubject = <PromiseLike<unknown>><unknown>this.subject;

        if (expected === anything) {
            try {
                const actual = await promiseSubject;

                return this.custom(actual, expected, !reverse, 'Expected %subject% to %reverse=not %resolve%failed=, but it resolved with %actual%%.', reverse);
            }
            catch (actual: unknown) {
                return this.custom(actual, expected, !reverse, 'Expected %subject% to %reverse=not %resolve%failed=, but it rejected with %actual%%.', reverse);
            }
        }
        else {
            try {
                const actual = await promiseSubject;

                return this.custom(actual, expected, actual === expected, 'Expected %subject% to %reverse=not %resolve with %expected%%failed=, but it resolved with %actual%%.', reverse);
            }
            catch (actual: unknown) {
                return this.custom(actual, expected, false, 'Expected %subject% to %reverse=not %resolve with %expected%, but it rejected with %actual%.', reverse);
            }
        }
    }

    public async rejects(): Promise<AssertionResult<TSubject, unknown, unknown>>;
    public async rejects<TExpected>(expected: TExpected): Promise<AssertionResult<TSubject, unknown, TExpected>>;
    public async rejects<TExpected>(expected: TExpected, reverse: boolean): Promise<AssertionResult<TSubject, unknown, TExpected>>;
    public async rejects(expected: unknown = anything, reverse: boolean = false): Promise<AssertionResult<unknown, unknown, unknown>> {
        const isInResult = new Assert('then').isIn(<object><unknown>this.subject);

        if (!isInResult.result) {
            return isInResult;
        }

        const promiseSubject = <PromiseLike<unknown>><unknown>this.subject;

        if (expected === anything) {
            try {
                const actual = await promiseSubject;

                return this.custom(actual, expected, !reverse, 'Expected %subject% to %reverse=not %reject%failed=, but it resolved with %actual%%.', reverse);
            }
            catch (actual: unknown) {
                return this.custom(actual, expected, !reverse, 'Expected %subject% to %reverse=not %reject%failed=, but it rejected with %actual%%.', reverse);
            }
        }
        else {
            try {
                const actual = await promiseSubject;

                return this.custom(actual, expected, false, 'Expected %subject% to %reverse=not %reject with %expected%, but it resolved with %actual%.', reverse);
            }
            catch (actual: unknown) {
                return this.custom(actual, expected, actual === expected, 'Expected %subject% to %reverse=not %reject with %expected%%failed=, but it rejected with %actual%%.', reverse);
            }
        }
    }
}

export function assert<TSubject>(subject: TSubject): Assert<TSubject> {
    return new Assert(subject);
}
