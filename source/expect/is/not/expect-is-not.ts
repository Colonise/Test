import type { AssertionResult } from '@colonise/assert';
import { assertUndefined } from '@colonise/assert';
import {
    assertEqual,
    assertStrictEqual
} from '@colonise/assert';

export interface ExpectIsNotChain<TSubject> {

    /**
     * @example expect(actual).is.not(expected)
     *
     * @param expected
     */
    <TExpected extends TSubject>(expected: TExpected): AssertionResult<TSubject, TSubject, TExpected>;

    /**
     * @example expect(actual).is.not(expected, strict)
     *
     * @param expected
     * @param strict
     */
    <TExpected extends TSubject>(expected: TExpected, strict: boolean): AssertionResult<TSubject, TSubject, TExpected>;

    /**
     * @example expect(actual).is.not.equal(expected)
     *
     * @param expected
     */
    equal<TExpected extends TSubject>(expected: TExpected): AssertionResult<TSubject, TSubject, TExpected>;

    /**
     * @example expect(actual).is.not.equal(expected, strict)
     *
     * @param expected
     * @param strict
     */
    equal<TExpected extends TSubject>(expected: TExpected, strict: boolean): AssertionResult<TSubject, TSubject, TExpected>;

    /**
     * @example expect(actual).to.be.undefined()
     */
    undefined(): AssertionResult<TSubject, TSubject, undefined>;
}

export function createExpectIsNotChain<TSubject>(subject: TSubject): ExpectIsNotChain<TSubject> {
    return Object.assign(
        // eslint-disable-next-line prefer-arrow-callback
        function not<TExpected extends TSubject>(
            expected: TExpected,
            strict: boolean = false
        ): AssertionResult<TSubject, TSubject, TExpected> {
            if (strict) {
                assertStrictEqual(subject, expected, true);
            }

            return assertEqual(subject, expected, true);
        },
        {
            equal<TExpected extends TSubject>(expected: TExpected, strict: boolean = false): AssertionResult<TSubject, TSubject, TExpected> {
                if (strict) {
                    assertStrictEqual(subject, expected, true);
                }

                return assertEqual(subject, expected, true);
            },
            undefined(): AssertionResult<TSubject, TSubject, undefined> {
                return assertUndefined(subject);
            }
        }
    );
}
