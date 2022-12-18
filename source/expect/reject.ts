import { assert, AssertionResult } from '../assert';

export interface RejectChain<TSubject> {

    /**
     *
     */
    (): AssertionResult<TSubject, unknown, unknown>;

    /**
     *
     */
    <TExpected>(expected: TExpected): AssertionResult<TSubject, unknown, TExpected>;

    /**
     *
     */
    <TExpected>(expected: TExpected, strict: boolean): AssertionResult<TSubject, unknown, TExpected>;

}

export function createRejectChain<TSubject>(subject: TSubject, reverse: boolean = false): RejectChain<TSubject> {
    return Object.defineProperties(
        function <TExpected>(
            expected: TExpected
        ): Promise<AssertionResult<TSubject, unknown, TExpected>> {
            return assert(subject).rejects(expected, reverse);
        },
        {}
    );
}
