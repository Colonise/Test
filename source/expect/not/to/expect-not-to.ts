import type { AssertionResult } from '@colonise/assert';
import { createExpectToBeChain } from './expect-to-be';
import type { ExpectToBeChain } from './expect-to-be';
import {
    assertEqual,
    assertStrictEqual,
    assertThrow
} from '@colonise/assert';

export interface ExpectNotToChain<TSubject> {

    /**
     * @example expect(actual).not.to.be
     */
    be: ExpectToBeChain<TSubject>;

    /**
     * @example expect(actual).not.to.equal(expected)
     *
     * @param expected
     */
    equal<TExpected extends TSubject>(expected: TExpected): AssertionResult<TSubject, TSubject, TExpected>;

    /**
     * @example expect(actual).not.to.equal(expected, strict)
     *
     * @param expected
     * @param strict
     */
    equal<TExpected extends TSubject>(expected: TExpected, strict: boolean): AssertionResult<TSubject, TSubject, TExpected>;

    /**
     * @example expect(actual).not.to.throw(expected)
     *
     * @param expected
     */
    throw<TExpected>(expected: TExpected): AssertionResult<TSubject, unknown, TExpected>;
}

export function createExpectNotToChain<TSubject>(subject: TSubject): ExpectNotToChain<TSubject> {
    return Object.assign(
        {},
        {
            // eslint-disable-next-line id-length
            get be(): ExpectToBeChain<TSubject> {
                return createExpectToBeChain(subject);
            },
            equal<TExpected extends TSubject>(expected: TExpected, strict: boolean = false): AssertionResult<TSubject, TSubject, TExpected> {
                if (strict) {
                    assertStrictEqual(subject, expected, true);
                }

                return assertEqual(subject, expected, true);
            },
            throw<TExpected>(expected: TExpected): AssertionResult<TSubject, unknown, TExpected> {
                return assertThrow(subject, expected, true);
            }
        }
    );
}
