import { assert } from '../assert';
import type { AssertionResult } from '../assert';
import { createIsChain } from './is';
import { createRejectChain } from './reject';
import { createResolveChain } from './resolve';
import { createReturnChain } from './return';
import { createThrowChain } from './throw';
import { createToChain } from './to';
import { createWillChain } from './will';
import type { IsChain } from './is';
import type { RejectChain } from './reject';
import type { ResolveChain } from './resolve';
import type { ReturnChain } from './return';
import type { ThrowChain } from './throw';
import type { ToChain } from './to';
import type { WillChain } from './will';

export interface ExpectNotChain<TSubject> {

    /**
     * @example expect(subject).to
     */
    to: ToChain<TSubject>;
}

export interface ExpectChain<TSubject> extends ExpectNotChain<TSubject> {

    /**
     * @example expect(subject).is
     */
    is: IsChain<TSubject>;

    /**
     * @example expect(subject).not
     */
    not: ExpectNotChain<TSubject>;

    /**
     * @example expect(subject).will
     */
    will: WillChain<Promise<TSubject>>;

    /**
     * @example expect(subject).returns();
     */
    returns: ReturnChain<TSubject>;

    /**
     * @example expect(subject).throws();
     */
    throws: ThrowChain<TSubject>;

    // TODO: remove the .resolves(any) and .resolves(any, strict) interfaces
    /**
     * @example expect(actual).will.resolve
     */
    resolves: ResolveChain<TSubject>;

    // TODO: remove the .rejects(any) and .rejects(any, strict) interfaces
    /**
     * @example expect(actual).will.reject
     */
    rejects: RejectChain<TSubject>;

    /**
     * @example expect(subject).equals(expected);
     *
     * @param expected
     */
    equals<TExpected extends TSubject>(expected: TExpected): AssertionResult<TSubject, TSubject, TExpected>;

    /**
     * @example expect(subject).equals(expected, strict);
     *
     * @param expected
     * @param strict
     */
    equals<TExpected extends TSubject>(expected: TExpected, strict: boolean): AssertionResult<TSubject, TSubject, TExpected>;
}

// eslint-disable-next-line max-lines-per-function
export function createExpectChain<TSubject>(subject: TSubject, reverse: boolean = false): ExpectChain<TSubject> {
    return <ExpectChain<TSubject>>Object.defineProperties(
        {},
        {
            // eslint-disable-next-line id-length
            is: {
                get(): IsChain<TSubject> {
                    return createIsChain(subject, reverse);
                }
            },
            not: {
                get(): ExpectNotChain<TSubject> {
                    return createExpectChain(subject, !reverse);
                }
            },
            // eslint-disable-next-line id-length
            to: {
                get(): ToChain<TSubject> {
                    return createToChain(subject, reverse);
                }
            },
            will: {
                get(): WillChain<Promise<unknown>> {
                    return createWillChain(<Promise<unknown>><unknown>subject, reverse);
                }
            },
            returns: {
                get(): ReturnChain<TSubject> {
                    return createReturnChain(subject, reverse);
                }
            },
            'throws': {
                get(): ThrowChain<TSubject> {
                    return createThrowChain(subject, reverse);
                }
            },
            resolves: {
                get(): ResolveChain<TSubject> {
                    return createResolveChain(subject, reverse);
                }
            },
            rejects: {
                get(): RejectChain<TSubject> {
                    return createRejectChain(subject, reverse);
                }
            },
            equals: {
                value<TExpected extends TSubject>(expected: TExpected, strict: boolean = false): AssertionResult<TSubject, TSubject, TExpected> {
                    return strict
                        ? assert(subject).striclyEquals(expected, reverse)
                        : assert(subject).equals(expected, reverse);
                }
            }
        }
    );
}

export function expect<TSubject>(value: TSubject): ExpectChain<TSubject> {
    return createExpectChain(value);
}
