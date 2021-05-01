import type { AssertionResult } from '@colonise/assert';
import {
    assertEqual,
    assertStrictEqual
} from '@colonise/assert';

export interface ExpectIsChain<TSubject> {

    /**
     * @example expect(actual).is(expected)
     *
     * @param expected
     */
    <TExpected extends TSubject>(expected: TExpected): AssertionResult<TSubject, TSubject, TExpected>;

    /**
     * @example expect(actual).is(expected, strict)
     *
     * @param expected
     * @param strict
     */
    <TExpected extends TSubject>(expected: TExpected, strict: boolean): AssertionResult<TSubject, TSubject, TExpected>;
}

export function createExpectIsChain<TSubject>(subject: TSubject): ExpectIsChain<TSubject> {
    return Object.assign(
        // eslint-disable-next-line id-length, prefer-arrow-callback
        function is<TExpected extends TSubject>(
            expected: TExpected,
            strict: boolean = false
        ): AssertionResult<TSubject, TSubject, TExpected> {
            if (strict) {
                assertStrictEqual(subject, expected);
            }

            return assertEqual(subject, expected);
        },
        { }
    );
}
