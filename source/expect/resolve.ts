import { assert } from '../assert';
import type { AssertionResult } from '../assert';

export interface ResolveChain<TSubject> {

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

export function createResolveChain<TSubject>(subject: TSubject, reverse: boolean = false): ResolveChain<TSubject> {
    return <ResolveChain<TSubject>>Object.defineProperties(
        // eslint-disable-next-line prefer-arrow-callback
        async function resolve<TExpected extends TSubject>(
            expected: TExpected
        ): Promise<AssertionResult<TSubject, unknown, TExpected>> {
            return assert(subject).resolves(expected, reverse);
        },
        {}
    );
}
