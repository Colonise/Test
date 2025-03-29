import { assert } from '../assert';
import type { AssertionResult } from '../assert';
import type { Constructor } from '@colonise/utilities';

export interface AChain<TSubject> {

    /**
     * @example expect(actual).to.be.a(expected)
     *
     * @param expected
     */
    <TExpected extends Constructor>(expected: TExpected): AssertionResult<TSubject, TSubject, TExpected>;

    /**
     * @example expect(actual).to.be.a(expected)
     *
     * @param expected
     */
    <TExpected extends string>(expected: TExpected): AssertionResult<TSubject, TSubject, TExpected>;

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

export interface AnChain<TSubject> {

    /**
     * @example expect(actual).to.be.an(expected)
     *
     * @param expected
     */
    <TExpected extends Constructor>(expected: TExpected): AssertionResult<TSubject, TSubject, TExpected>;

    /**
     * @example expect(actual).to.be.an(expected)
     *
     * @param expected
     */
    <TExpected extends string>(expected: TExpected): AssertionResult<TSubject, TSubject, TExpected>;

    instance: {
        of: {

            /**
             * @example expect(actual).to.be.an(expected)
             *
             * @param expected
             */
            <TExpected extends Constructor>(expected: TExpected): AssertionResult<TSubject, TSubject, TExpected>;

            /**
             * @example expect(actual).to.be.an(expected)
             *
             * @param expected
             */
            <TExpected extends string>(expected: TExpected): AssertionResult<TSubject, TSubject, TExpected>;
        };
    };

    /**
     * @example expect(actual).to.be.an.object()
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    object(): AssertionResult<TSubject, TSubject, object>;
}

// eslint-disable-next-line max-lines-per-function
export function createAOrAnChain<TSubject>(subject: TSubject, reverse: boolean = false): AChain<TSubject> & AnChain<TSubject> {
    return <AChain<TSubject> & AnChain<TSubject>>Object.defineProperties(
        // eslint-disable-next-line id-length, prefer-arrow-callback
        function a<TExpected extends Constructor<TSubject> | string>(
            expected: TExpected
        ): AssertionResult<TSubject, TSubject, TExpected> {
            if (typeof expected === 'string') {
                return <AssertionResult<TSubject, TSubject, TExpected>><unknown>assert(subject).isTypeOf(<'string'>expected, reverse);
            }

            return <AssertionResult<TSubject, TSubject, TExpected>>assert(subject).isAnInstanceOf(<Constructor<TSubject>>expected, reverse);
        },
        {
            string: {
                value(): AssertionResult<TSubject, TSubject, string> {
                    return assert(subject).isTypeOf('string', reverse);
                }
            },
            number: {
                value(): AssertionResult<TSubject, TSubject, number> {
                    return assert(subject).isTypeOf('number', reverse);
                }
            },
            bigint: {
                value(): AssertionResult<TSubject, TSubject, bigint> {
                    return assert(subject).isTypeOf('bigint', reverse);
                }
            },
            'boolean': {
                value(): AssertionResult<TSubject, TSubject, boolean> {
                    return assert(subject).isTypeOf('boolean', reverse);
                }
            },
            symbol: {
                value(): AssertionResult<TSubject, TSubject, symbol> {
                    return assert(subject).isTypeOf('symbol', reverse);
                }
            },
            'function': {
                // eslint-disable-next-line @typescript-eslint/ban-types
                value(): AssertionResult<TSubject, TSubject, Function> {
                    return assert(subject).isTypeOf('function', reverse);
                }
            },
            object: {
                // eslint-disable-next-line @typescript-eslint/ban-types
                value(): AssertionResult<TSubject, TSubject, object> {
                    return assert(subject).isTypeOf('object', reverse);
                }
            },
            instance: {
                get() {
                    return {
                        // eslint-disable-next-line id-length
                        of(expected: Constructor) {
                            return assert(subject).isAnInstanceOf(expected, reverse);
                        }
                    };
                }
            }
        }
    );
}
