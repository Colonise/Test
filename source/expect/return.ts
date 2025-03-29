import { assert } from '../assert';
import type { AssertionResult } from '../assert';
import { createAOrAnChain } from './a-or-an';
import type {
    AChain, AnChain
} from './a-or-an';

export interface ReturnChain<TSubject> {

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

export function createReturnChain<TSubject>(subject: TSubject, reverse: boolean = false): ReturnChain<TSubject> {
    return <ReturnChain<TSubject>>Object.defineProperties(
        // eslint-disable-next-line prefer-arrow-callback
        function returns<TExpected extends TSubject>(
            expected: TExpected
        ): AssertionResult<TSubject, unknown, TExpected> {
            return assert(subject).returns(expected, reverse);
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
