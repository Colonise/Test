import { assert } from '../assert';
import type { AssertionResult } from '../assert';
import { createAOrAnChain } from './a-or-an';
import type {
    AChain, AnChain
} from './a-or-an';

export interface ThrowChain<TSubject> {

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

    /**
     *
     */
    a: AChain<TSubject>;

    /**
     *
     */
    an: AnChain<TSubject>;

}

export function createThrowChain<TSubject>(subject: TSubject, reverse: boolean = false): ThrowChain<TSubject> {
    return <ThrowChain<TSubject>>Object.defineProperties(
        // eslint-disable-next-line prefer-arrow-callback
        function throws<TExpected extends TSubject>(
            expected: TExpected
        ): AssertionResult<TSubject, unknown, TExpected> {
            return assert(subject).throws(expected, reverse);
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
            }
        }
    );
}
