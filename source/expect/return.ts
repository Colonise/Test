import type { AChain } from './a';
import type { AnChain } from './an';
import type { AssertionResult } from '@colonise/assert';
import { createAChain } from './a';
import { createAnChain } from './an';
import {
    assertReturn, assertReturnAnything
} from '@colonise/assert';

export interface ReturnChain<TSubject extends () => unknown> {

    /**
     *
     */
    // (): AssertionResult<TSubject, unknown, unknown>;

    /**
     *
     */
    <TExpected>(expected: TExpected): AssertionResult<TSubject, unknown, TExpected>;

    /**
     *
     */
    // <TExpected>(expected: TExpected, strict?: boolean): AssertionResult<TSubject, unknown, TExpected>;

    /**
     *
     */
    a: AChain<TSubject>;

    /**
     *
     */
    an: AnChain<TSubject>;

}

export function createReturnChain<TSubject extends () => unknown>(subject: TSubject, reverse: boolean = false): ReturnChain<TSubject> {
    return Object.assign(
        <TExpected>(
            expected: TExpected = <TExpected><unknown>assertReturnAnything
        ): AssertionResult<TSubject, unknown, TExpected> => assertReturn(subject, expected, reverse),
        {
            // eslint-disable-next-line id-length
            get a(): AChain<TSubject> {
                return createAChain(subject, reverse);
            },
            // eslint-disable-next-line id-length
            get an(): AnChain<TSubject> {
                return createAnChain(subject, reverse);
            }
        }
    );
}
