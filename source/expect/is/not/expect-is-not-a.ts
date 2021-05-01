import { assertInstanceOf } from '@colonise/assert';
import type { AssertionResult } from '@colonise/assert';
import { assertTypeOf } from '@colonise/assert';
import type { Constructor } from '@colonise/utilities';

export interface ExpectIsNotAChain<TSubject> {

    /**
     * @example expect(actual).is.not.a(expected)
     *
     * @param expected
     */
    <TExpected extends Constructor<TSubject>>(expected: TExpected): AssertionResult<TSubject, TSubject, TExpected>;

    /**
     * @example expect(actual).is.not.a.string()
     */
    string(): AssertionResult<TSubject, TSubject, string>;

    /**
     * @example expect(actual).is.not.a.number()
     */
    number(): AssertionResult<TSubject, TSubject, number>;

    /**
     * @example expect(actual).is.not.a.bigint()
     */
    bigint(): AssertionResult<TSubject, TSubject, bigint>;

    /**
     * @example expect(actual).is.not.a.boolean()
     */
    boolean(): AssertionResult<TSubject, TSubject, boolean>;

    /**
     * @example expect(actual).is.not.a.symbol()
     */
    symbol(): AssertionResult<TSubject, TSubject, symbol>;

    /**
     * @example expect(actual).is.not.a.function()
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    function(): AssertionResult<TSubject, TSubject, Function>;
}

export function createExpectIsNotAChain<TSubject>(subject: TSubject): ExpectIsNotAChain<TSubject> {
    return Object.assign(
        // eslint-disable-next-line id-length, prefer-arrow-callback
        function a<TExpected extends Constructor<TSubject>>(
            expected: TExpected
        ): AssertionResult<TSubject, TSubject, TExpected> {
            return assertInstanceOf(subject, expected, true);
        },
        {
            string(): AssertionResult<TSubject, TSubject, string> {
                return assertTypeOf(subject, 'string', true);
            },
            number(): AssertionResult<TSubject, TSubject, number> {
                return assertTypeOf(subject, 'number', true);
            },
            bigint(): AssertionResult<TSubject, TSubject, bigint> {
                return assertTypeOf(subject, 'bigint', true);
            },
            boolean(): AssertionResult<TSubject, TSubject, boolean> {
                return assertTypeOf(subject, 'boolean', true);
            },
            symbol(): AssertionResult<TSubject, TSubject, symbol> {
                return assertTypeOf(subject, 'symbol', true);
            },
            // eslint-disable-next-line @typescript-eslint/ban-types
            function(): AssertionResult<TSubject, TSubject, Function> {
                return assertTypeOf(subject, 'function', true);
            }
        }
    );
}
