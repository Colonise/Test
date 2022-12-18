import { assert, AssertionResult } from '../assert';

export interface ResolveChain<TSubject> {

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

export function createResolveChain<TSubject>(subject: TSubject, reverse: boolean = false): ResolveChain<TSubject> {
    return Object.defineProperties(
        function <TExpected>(
            expected: TExpected
        ): Promise<AssertionResult<TSubject, unknown, TExpected>> {
            return assert(subject).resolves(expected, reverse);
        },
        {}
    );
}
