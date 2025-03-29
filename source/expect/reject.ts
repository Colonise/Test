import { assert } from '../assert';
import type { AssertionResult } from '../assert';

export interface RejectChain<TSubject> {

    /**
     *
     */
    (): Promise<AssertionResult<TSubject, unknown, unknown>>;

    /**
     *
     */
    <TExpected>(expected: TExpected): Promise<AssertionResult<TSubject, unknown, TExpected>>;

    /**
     *
     */
    <TExpected>(expected: TExpected, strict: boolean): Promise<AssertionResult<TSubject, unknown, TExpected>>;

    // TODO: add .with
}

export function createRejectChain<TSubject>(subject: TSubject, reverse: boolean = false): RejectChain<TSubject> {
    return <RejectChain<TSubject>>Object.defineProperties(
        // eslint-disable-next-line prefer-arrow-callback
        async function reject<TExpected extends TSubject>(
            expected: TExpected
        ): Promise<AssertionResult<TSubject, unknown, TExpected>> {
            return assert(subject).rejects(expected, reverse);
        },
        {}
    );
}
