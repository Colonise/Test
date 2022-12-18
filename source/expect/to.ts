import { assert, AssertionResult } from '../assert';
import { BeChain, createBeChain } from './be';
import { createRejectChain, RejectChain } from './reject';
import { createResolveChain, ResolveChain } from './resolve';
import { createReturnChain, ReturnChain } from './return';
import { createThrowChain, ThrowChain } from './throw';

export interface ToNotChain<TSubject> {

    /**
     * @example expect(actual).to.be
     */
    be: BeChain<TSubject>;

    /**
     * @example expect(subject).returns();
     */
    return: ReturnChain<TSubject>;

    /**
     * @example expect(subject).throws();
     */
    throw: ThrowChain<TSubject>;

    /**
     * @example expect(actual).will.resolve
     */
    resolve: ResolveChain<TSubject>;

    /**
     * @example expect(actual).will.reject
     */
    reject: RejectChain<TSubject>;

    /**
     * @example expect(actual).to.equal(expected)
     *
     * @param expected
     */
    equal<TExpected extends TSubject>(expected: TExpected): AssertionResult<TSubject, TSubject, TExpected>;

    /**
     * @example expect(actual).to.equal(expected, strict)
     *
     * @param expected
     * @param strict
     */
    equal<TExpected extends TSubject>(expected: TExpected, strict: boolean): AssertionResult<TSubject, TSubject, TExpected>;
}

export interface ToChain<TSubject> extends ToNotChain<TSubject> {

    /**
     * @example expect(actual).to.not
     */
    not: ToNotChain<TSubject>;
}

export function createToChain<TSubject>(subject: TSubject, reverse: boolean = false): ToChain<TSubject> {
    return Object.defineProperties(
        {},
        {
            // eslint-disable-next-line id-length
            be: {
                get(): BeChain<TSubject> {
                    return createBeChain(subject, reverse);
                }
            },
            not: {
                get(): ToNotChain<TSubject> {
                    return createToChain(subject, !reverse);
                }
            },
            return: {
                get(): ReturnChain<TSubject> {
                    return createReturnChain(subject, reverse);
                }
            },
            throw: {
                get(): ThrowChain<TSubject> {
                    return createThrowChain(subject, reverse);
                }
            },
            resolve: {
                get(): ResolveChain<TSubject> {
                    return createResolveChain(subject, reverse);
                }
            },
            reject: {
                get(): RejectChain<TSubject> {
                    return createRejectChain(subject, reverse);
                }
            },
            equal: {
                value<TExpected extends TSubject>(expected: TExpected, strict: boolean = false): AssertionResult<TSubject, TSubject, TExpected> {
                    return strict
                        ? assert(subject).striclyEquals(expected, reverse)
                        : assert(subject).equals(expected, reverse);
                }
            }
        }
    );
}
