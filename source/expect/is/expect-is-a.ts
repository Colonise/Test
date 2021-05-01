import { assertInstanceOf } from '@colonise/assert';
import type { AssertionResult } from '@colonise/assert';
import { assertTypeOf } from '@colonise/assert';
import type { Constructor } from '@colonise/utilities';

export interface ExpectIsAChain<TSubject> {

    /**
     * @example expect(actual).is.a(expected)
     *
     * @param expected
     */
    <TExpected extends Constructor<TSubject>>(expected: TExpected): AssertionResult<TSubject, TSubject, TExpected>;

    /**
     * @example expect(actual).is.a.string()
     */
    string(): AssertionResult<TSubject, TSubject, string>;

    /**
     * @example expect(actual).is.a.number()
     */
    number(): AssertionResult<TSubject, TSubject, number>;

    /**
     * @example expect(actual).is.a.bigint()
     */
    bigint(): AssertionResult<TSubject, TSubject, bigint>;

    /**
     * @example expect(actual).is.a.boolean()
     */
    boolean(): AssertionResult<TSubject, TSubject, boolean>;

    /**
     * @example expect(actual).is.a.symbol()
     */
    symbol(): AssertionResult<TSubject, TSubject, symbol>;

    /**
     * @example expect(actual).is.a.function()
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    function(): AssertionResult<TSubject, TSubject, Function>;
}

export function createExpectIsAChain<TSubject>(subject: TSubject): ExpectIsAChain<TSubject> {
    return Object.assign(
        // eslint-disable-next-line id-length, prefer-arrow-callback
        function a<TExpected extends Constructor<TSubject>>(
            expected: TExpected
        ): AssertionResult<TSubject, TSubject, TExpected> {
            return assertInstanceOf(subject, expected);
        },
        {
            string(): AssertionResult<TSubject, TSubject, string> {
                return assertTypeOf(subject, 'string');
            },
            number(): AssertionResult<TSubject, TSubject, number> {
                return assertTypeOf(subject, 'number');
            },
            bigint(): AssertionResult<TSubject, TSubject, bigint> {
                return assertTypeOf(subject, 'bigint');
            },
            boolean(): AssertionResult<TSubject, TSubject, boolean> {
                return assertTypeOf(subject, 'boolean');
            },
            symbol(): AssertionResult<TSubject, TSubject, symbol> {
                return assertTypeOf(subject, 'symbol');
            },
            // eslint-disable-next-line @typescript-eslint/ban-types
            function(): AssertionResult<TSubject, TSubject, Function> {
                return assertTypeOf(subject, 'function');
            }
        }
    );
}
