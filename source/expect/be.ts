import { assert, AssertionResult } from '../assert';
import { AChain, AnChain, createAOrAnChain } from './a-or-an';


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
     * @example expect(actual).to.be.undefined()
     */
    undefined(): AssertionResult<TSubject, TSubject, undefined>;
}

export function createBeChain<TSubject>(subject: TSubject, reverse: boolean = false): BeChain<TSubject> {
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
            undefined: {
                value(): AssertionResult<TSubject, TSubject, undefined> {
                    return assert(subject).isUndefined(reverse);
                }
            }
        }
    );
}
