import { AChain, AnChain, createAOrAnChain } from './a-or-an';
import { assert, AssertionResult } from '../assert';

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
    return Object.defineProperties(
        function <TExpected extends TSubject>(
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
