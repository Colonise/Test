import type { AssertionResult } from '@colonise/assert';

export interface ExpectReturnsChain<TSubject> {

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
    <TExpected>(expected: TExpected, strict?: boolean): AssertionResult<TSubject, unknown, TExpected>;
}
