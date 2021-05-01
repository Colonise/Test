import type { AssertionResult } from '@colonise/assert';
import { createExpectIsChain } from './is/expect-is';
import { createExpectNotChain } from './not/expect-not';
import { createExpectToChain } from './to/expect-to';
import { createExpectWillChain } from './will/expect-will';
import type { ExpectIsChain } from './is/expect-is';
import type { ExpectNotChain } from './not/expect-not';
import type { ExpectToChain } from './to/expect-to';
import type { ExpectWillChain } from './will/expect-will';
import {
    assertEqual,
    assertStrictEqual
} from '@colonise/assert';

export interface ExpectChain<TSubject> {

    /**
     * @example expect(subject).is
     */
    is: ExpectIsChain<TSubject>;

    /**
     * @example expect(subject).not
     */
    not: ExpectNotChain<TSubject>;

    /**
     * @example expect(subject).to
     */
    to: ExpectToChain<TSubject>;

    /**
     * @example expect(subject).will
     */
    will: ExpectWillChain<Promise<TSubject>>;

    /**
     * @example expect(subject).equals(expected);
     *
     * @param expected
     */
    equals<TExpected extends TSubject>(expected: TExpected): AssertionResult<TSubject, TSubject, TExpected>;

    /**
     * @example expect(subject).equals(expected, strict);
     *
     * @param expected
     * @param strict
     */
    equals<TExpected extends TSubject>(expected: TExpected, strict?: boolean): AssertionResult<TSubject, TSubject, TExpected>;
}

export function createExpectChain<TSubject>(subject: TSubject): ExpectChain<TSubject> {
    return Object.assign(
        {},
        {
            // eslint-disable-next-line id-length
            get is(): ExpectIsChain<TSubject> {
                return createExpectIsChain(subject);
            },
            get not(): ExpectNotChain<TSubject> {
                return createExpectNotChain(subject);
            },
            // eslint-disable-next-line id-length
            get to(): ExpectToChain<TSubject> {
                return createExpectToChain(subject);
            },
            get will(): ExpectWillChain<Promise<unknown>> {
                return createExpectWillChain(<Promise<unknown>><unknown>subject);
            },
            equals<TExpected extends TSubject>(expected: TExpected, strict: boolean = false): AssertionResult<TSubject, TSubject, TExpected> {
                if (strict) {
                    return assertStrictEqual(subject, expected);
                }

                return assertEqual(subject, expected);
            }
        }
    );
}

export function expect<TSubject>(value: TSubject): ExpectChain<TSubject> {
    return createExpectChain(value);
}
