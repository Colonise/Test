import type { AssertionResult } from '@colonise/assert';
import { assertUndefined } from '@colonise/assert';
import {
    assertEqual,
    assertStrictEqual
} from '@colonise/assert';

export interface ExpectToBeChain<TSubject> {

    /**
     * @example expect(actual).to.be(expected)
     *
     * @param expected
     */
    <TExpected extends TSubject>(expected: TExpected): AssertionResult<TSubject, TSubject, TExpected>;

    /**
     * @example expect(actual).to.be(expected, strict)
     *
     * @param expected
     * @param strict
     */
    <TExpected extends TSubject>(expected: TExpected, strict: boolean): AssertionResult<TSubject, TSubject, TExpected>;

    /**
     * @example expect(actual).to.be.undefined()
     */
    undefined(): AssertionResult<TSubject, TSubject, undefined>;
}

export function createExpectToBeChain<TSubject>(subject: TSubject): ExpectToBeChain<TSubject> {
    return Object.assign(
        // eslint-disable-next-line id-length, prefer-arrow-callback
        function be<TExpected extends TSubject>(
            expected: TExpected,
            strict: boolean = false
        ): AssertionResult<TSubject, TSubject, TExpected> {
            if (strict) {
                assertStrictEqual(subject, expected);
            }

            return assertEqual(subject, expected);
        },
        {
            undefined(): AssertionResult<TSubject, TSubject, undefined> {
                return assertUndefined(subject);
            }
        }
    );
}
