import { assertInstanceOf } from '@colonise/assert';
import type { AssertionResult } from '@colonise/assert';
import { assertTypeOf } from '@colonise/assert';
import type { Constructor } from '@colonise/utilities';

export interface ExpectNotToBeAnChain<TSubject> {

    /**
     * @example expect(actual).not.to.be.an(expected)
     *
     * @param expected
     */
    <TExpected extends Constructor<TSubject>>(expected: TExpected): AssertionResult<TSubject, TSubject, TExpected>;

    /**
     * @example expect(actual).not.to.be.an.object()
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    object(): AssertionResult<TSubject, TSubject, object>;
}

export function createExpectNotToBeAnChain<TSubject>(subject: TSubject): ExpectNotToBeAnChain<TSubject> {
    return Object.assign(
        // eslint-disable-next-line id-length, prefer-arrow-callback
        function an<TExpected extends Constructor<TSubject>>(
            expected: TExpected
        ): AssertionResult<TSubject, TSubject, TExpected> {
            return assertInstanceOf(subject, expected, true);
        },
        {
        // eslint-disable-next-line @typescript-eslint/ban-types
            object(): AssertionResult<TSubject, TSubject, object> {
                return assertTypeOf(subject, 'object', true);
            }
        }
    );
}
