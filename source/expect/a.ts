import { assertInstanceOf } from '@colonise/assert';
import type { AssertionResult } from '@colonise/assert';
import { assertTypeOf } from '@colonise/assert';
import type { Constructor } from '@colonise/utilities';

export interface AChain<TSubject> {

    /**
     * @example expect(actual).to.be.a(expected)
     *
     * @param expected
     */
    <TExpected extends Constructor<TSubject>>(expected: TExpected): AssertionResult<TSubject, TSubject, TExpected>;

    /**
     * @example expect(actual).to.be.a.string()
     */
    string(): AssertionResult<TSubject, TSubject, string>;

    /**
     * @example expect(actual).to.be.a.number()
     */
    number(): AssertionResult<TSubject, TSubject, number>;

    /**
     * @example expect(actual).to.be.a.bigint()
     */
    bigint(): AssertionResult<TSubject, TSubject, bigint>;

    /**
     * @example expect(actual).to.be.a.boolean()
     */
    boolean(): AssertionResult<TSubject, TSubject, boolean>;

    /**
     * @example expect(actual).to.be.a.symbol()
     */
    symbol(): AssertionResult<TSubject, TSubject, symbol>;

    /**
     * @example expect(actual).to.be.a.function()
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    function(): AssertionResult<TSubject, TSubject, Function>;
}

export function createAChain<TSubject>(subject: TSubject, reverse: boolean = false): AChain<TSubject> {
    return Object.assign(
        // eslint-disable-next-line id-length, prefer-arrow-callback
        function a<TExpected extends Constructor<TSubject>>(
            expected: TExpected
        ): AssertionResult<TSubject, TSubject, TExpected> {
            return assertInstanceOf(subject, expected, reverse);
        },
        {
            string(): AssertionResult<TSubject, TSubject, string> {
                return assertTypeOf(subject, 'string', reverse);
            },
            number(): AssertionResult<TSubject, TSubject, number> {
                return assertTypeOf(subject, 'number', reverse);
            },
            bigint(): AssertionResult<TSubject, TSubject, bigint> {
                return assertTypeOf(subject, 'bigint', reverse);
            },
            boolean(): AssertionResult<TSubject, TSubject, boolean> {
                return assertTypeOf(subject, 'boolean', reverse);
            },
            symbol(): AssertionResult<TSubject, TSubject, symbol> {
                return assertTypeOf(subject, 'symbol', reverse);
            },
            // eslint-disable-next-line @typescript-eslint/ban-types
            function(): AssertionResult<TSubject, TSubject, Function> {
                return assertTypeOf(subject, 'function', reverse);
            }
        }
    );
}
