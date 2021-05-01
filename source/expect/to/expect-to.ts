import type { AssertionResult } from '@colonise/assert';
import { createExpectToBeChain } from './expect-to-be';
import { createExpectToNotChain } from './expect-to-not';
import type { ExpectToBeChain } from './expect-to-be';
import type { ExpectToNotChain } from './expect-to-not';
import {
    assertEqual,
    assertStrictEqual,
    assertThrow
} from '@colonise/assert';

export interface ExpectToChain<TSubject> {

    /**
     * @example expect(actual).to.be
     */
    be: ExpectToBeChain<TSubject>;

    /**
     * @example expect(actual).to.not
     */
    not: ExpectToNotChain<TSubject>;

    /**
     * @example expect(actual).to.equal(expected)
     *
     * @param expected
     */
    equal<TExpected extends TSubject>(expected: TExpected): AssertionResult<TSubject, TSubject, TExpected>;

    /**
     * @example expect(actual).to.equal(expected, strict)
     *
     * @param expected
     * @param strict
     */
    equal<TExpected extends TSubject>(expected: TExpected, strict: boolean): AssertionResult<TSubject, TSubject, TExpected>;

    /**
     * @example expect(actual).to.throw(expected)
     *
     * @param expected
     */
    throw<TExpected>(expected: TExpected): AssertionResult<TSubject, unknown, TExpected>;
}

export function createExpectToChain<TSubject>(subject: TSubject): ExpectToChain<TSubject> {
    return Object.assign(
        {},
        {
            // eslint-disable-next-line id-length
            get be(): ExpectToBeChain<TSubject> {
                return createExpectToBeChain(subject);
            },
            get not(): ExpectToNotChain<TSubject> {
                return createExpectToNotChain(subject);
            },
            equal<TExpected extends TSubject>(expected: TExpected, strict: boolean = false): AssertionResult<TSubject, TSubject, TExpected> {
                if (strict) {
                    assertStrictEqual(subject, expected);
                }

                return assertEqual(subject, expected);
            },
            throw<TExpected>(expected: TExpected): AssertionResult<TSubject, unknown, TExpected> {
                return assertThrow(subject, expected);
            }
        }
    );
}
