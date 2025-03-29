import { assert } from '../assert';
import type { AssertionResult } from '../assert';
import { createAOrAnChain } from './a-or-an';
import type {
    AChain, AnChain
} from './a-or-an';

export interface BeChain<TSubject> {

    /**
     * @example expect(actual).to.be(expected)
     *
     * @param expected
     */
    <TExpected extends TSubject>(expected: TExpected): AssertionResult<TSubject, TSubject, TExpected>;

    /**
     * @example expect(actual).to.be(expected, strict)
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
    // eslint-disable-next-line @typescript-eslint/ban-types
    in<TExpected extends object>(expected: TExpected): AssertionResult<TSubject, TSubject, TExpected>;
}

// eslint-disable-next-line max-lines-per-function
export function createBeChain<TSubject>(subject: TSubject, reverse: boolean = false): BeChain<TSubject> {
    return <BeChain<TSubject>>Object.defineProperties(
        // eslint-disable-next-line id-length, prefer-arrow-callback
        function be<TExpected extends TSubject>(
            expected: TExpected,
            strict: boolean = false
        ): AssertionResult<TSubject, TSubject, TExpected> {
            return strict
                ? assert(subject).striclyEquals(expected, reverse)
                : assert(subject).equals(expected, reverse);
        },
        {
            // eslint-disable-next-line id-length
            a: {
                get(): AChain<TSubject> {
                    return createAOrAnChain(subject, reverse);
                }
            },
            // eslint-disable-next-line id-length
            an: {
                get(): AnChain<TSubject> {
                    return createAOrAnChain(subject, reverse);
                }
            },
            defined: {
                value(): AssertionResult<TSubject, unknown, unknown> {
                    return assert(subject).isDefined(reverse);
                }
            },
            'null': {
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
            },
            'in': {
                // eslint-disable-next-line @typescript-eslint/ban-types
                value<TExpected extends object>(expected: TExpected): AssertionResult<TSubject, TSubject, TExpected> {
                    return assert(subject).isIn(expected, reverse);
                }
            }
        }
    );
}
