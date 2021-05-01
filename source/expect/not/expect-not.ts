import type { AssertionResult } from '@colonise/assert';
import { createExpectToChain } from './expect-to';
import type { ExpectToChain } from './expect-to';
import {
    assertEqual,
    assertStrictEqual,
    assertThrow
} from '@colonise/assert';

export interface ExpectNotChain<TSubject> {

    /**
     * @example expect(actual).not.to
     */
    to: ExpectToChain<TSubject>;

    /**
     * @example expect(actual).not.equals(expected);
     *
     * @param expected
     */
    equals<TExpected extends TSubject>(expected: TExpected): AssertionResult<TSubject, TSubject, TExpected>;

    /**
     * @example expect(actual).not.equals(expected, strict);
     *
     * @param expected
     * @param strict
     */
    equals<TExpected extends TSubject>(expected: TExpected, strict: boolean): AssertionResult<TSubject, TSubject, TExpected>;

    /**
     * @example expect(actual).not.throws(expected);
     *
     * @param expected
     */
    throws<TExpected>(expected: TExpected): AssertionResult<TSubject, unknown, TExpected>;
}

export function createExpectNotChain<TSubject>(subject: TSubject): ExpectNotChain<TSubject> {
    return Object.assign(
        {},
        {
            // eslint-disable-next-line id-length
            get to(): ExpectToChain<TSubject> {
                return createExpectToChain(subject);
            },
            equals<TExpected extends TSubject>(expected: TExpected, strict: boolean = false): AssertionResult<TSubject, TSubject, TExpected> {
                if (strict) {
                    assertStrictEqual(subject, expected, true);
                }

                return assertEqual(subject, expected, true);
            },
            throws<TExpected>(expected: TExpected): AssertionResult<TSubject, unknown, TExpected> {
                return assertThrow(subject, expected, true);
            }
        }
    );
}
