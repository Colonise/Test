import { assert, AssertionResult } from '../assert';
import { AChain, AnChain, createAOrAnChain } from './a-or-an';

export interface IsNotChain<TSubject> {
    /**
     * @example expect(actual).is(expected)
     *
     * @param expected
     */
    <TExpected extends TSubject>(expected: TExpected): AssertionResult<TSubject, TSubject, TExpected>;

    /**
     * @example expect(actual).is(expected, strict)
     *
     * @param expected
     * @param strict
     */
    <TExpected extends TSubject>(expected: TExpected, strict: boolean): AssertionResult<TSubject, TSubject, TExpected>;

    /**
     * @example expect(actual).is.a
     */
    a: AChain<TSubject>;

    /**
     * @example expect(actual).is.an
     */
    an: AnChain<TSubject>;

    /**
     * @example expect(actual).is.defined()
     */
    defined(): AssertionResult<TSubject, unknown, unknown>;

    /**
     * @example expect(actual).is.null()
     */
    null(): AssertionResult<TSubject, unknown, unknown>;

    /**
     * @example expect(actual).is.undefined()
     */
    undefined(): AssertionResult<TSubject, unknown, unknown>;

    /**
     * @example expect(actual).is.truthy()
     */
    truthy(): AssertionResult<TSubject, unknown, unknown>;

    /**
     * @example expect(actual).is.falsey()
     */
    falsey(): AssertionResult<TSubject, unknown, unknown>;

    /**
     * @example expect(actual).is.in(expected)
     */
    in<TExpected extends object>(expected: TExpected): AssertionResult<TSubject, TSubject, TExpected>;
}

export interface IsChain<TSubject> extends IsNotChain<TSubject> {
    /**
     * @example expect(actual).is.not
     */
    not: IsNotChain<TSubject>;
}

export function createIsChain<TSubject>(subject: TSubject, reverse: boolean = false): IsChain<TSubject> {
    return Object.defineProperties(
        // eslint-disable-next-line id-length, prefer-arrow-callback
        function <TExpected extends TSubject>(
            expected: TExpected,
            strict: boolean = false
        ): AssertionResult<TSubject, TSubject, TExpected> {
            return strict
                ? assert(subject).striclyEquals(expected, reverse)
                : assert(subject).equals(expected, reverse);
        },
        {
            a: {
                get(): AChain<TSubject> {
                    return createAOrAnChain(subject, reverse);
                }
            },
            an: {
                get(): AnChain<TSubject> {
                    return createAOrAnChain(subject, reverse);
                }
            },
            not: {
                get(): IsChain<TSubject> {
                    return createIsChain(subject, !reverse);
                }
            },
            in: {
                value<TExpected extends object>(expected: TExpected): AssertionResult<TSubject, TSubject, TExpected> {
                    return assert(subject).isIn(expected, reverse);
                }
            },
            defined: {
                value(): AssertionResult<TSubject, unknown, unknown> {
                    return assert(subject).isDefined(reverse);
                }
            },
            null: {
                value(): AssertionResult<TSubject, unknown, unknown> {
                    return assert(subject).isNull(reverse);
                }
            },
            undefined: {
                value(): AssertionResult<TSubject, unknown, unknown> {
                    return assert(subject).isUndefined(reverse);
                }
            },
            truthy: {
                value(): AssertionResult<TSubject, unknown, unknown> {
                    return assert(subject).isTruthy(reverse);
                }
            },
            falsey: {
                value(): AssertionResult<TSubject, unknown, unknown> {
                    return assert(subject).isFalsey(reverse);
                }
            }
        }
    );
}
