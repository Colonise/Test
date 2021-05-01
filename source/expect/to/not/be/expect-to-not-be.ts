import type { AssertionResult } from '@colonise/assert';
import { assertUndefined } from '@colonise/assert';
import type { Constructor } from '@colonise/utilities';
import {
    assertEqual,
    assertStrictEqual
} from '@colonise/assert';

export interface ExpectToNotBeChain<TSubject> {

    /**
     * @example expect(actual).to.not.be(expected)
     *
     * @param expected
     */
    <TExpected extends Constructor<TSubject>>(expected: TExpected): AssertionResult<TSubject, TSubject, TExpected>;

    /**
     * @example expect(actual).to.not.be(expected)
     *
     * @param expected
     */
    <TExpected extends TSubject>(expected: TExpected): AssertionResult<TSubject, TSubject, TExpected>;

    /**
     * @example expect(actual).to.not.be(expected, strict)
     *
     * @param expected
     * @param strict
     */
    <TExpected extends TSubject>(expected: TExpected, strict: boolean): AssertionResult<TSubject, TSubject, TExpected>;

    /**
     * @example expect(actual).to.not.be.undefined()
     */
    undefined(): AssertionResult<TSubject, TSubject, undefined>;
}

export function createExpectToNotBeChain<TSubject>(subject: TSubject): ExpectToNotBeChain<TSubject> {
    return Object.assign(
        // eslint-disable-next-line id-length, prefer-arrow-callback
        function be<TExpected extends TSubject>(
            expected: TExpected,
            strict: boolean = false
        ): AssertionResult<TSubject, TSubject, TExpected> {
            if (strict) {
                assertStrictEqual(subject, expected, true);
            }

            return assertEqual(subject, expected, true);
        },
        {
            undefined(): AssertionResult<TSubject, TSubject, undefined> {
                return assertUndefined(subject, true);
            }
        }
    );
}
