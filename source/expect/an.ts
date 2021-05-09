import { assertInstanceOf } from '@colonise/assert';
import type { AssertionResult } from '@colonise/assert';
import { assertTypeOf } from '@colonise/assert';
import type { Constructor } from '@colonise/utilities';

export interface AnChain<TSubject> {

    /**
     * @example expect(actual).to.be.an(expected)
     *
     * @param expected
     */
    <TExpected extends Constructor<TSubject>>(expected: TExpected): AssertionResult<TSubject, TSubject, TExpected>;

    /**
     * @example expect(actual).to.be.an.object()
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    object(): AssertionResult<TSubject, TSubject, object>;
}

export function createAnChain<TSubject>(subject: TSubject, reverse: boolean = false): AnChain<TSubject> {
    return Object.assign(
        // eslint-disable-next-line id-length, prefer-arrow-callback
        function an<TExpected extends Constructor<TSubject>>(
            expected: TExpected
        ): AssertionResult<TSubject, TSubject, TExpected> {
            return assertInstanceOf(subject, expected, reverse);
        },
        {
            // eslint-disable-next-line @typescript-eslint/ban-types
            object(): AssertionResult<TSubject, TSubject, object> {
                return assertTypeOf(subject, 'object', reverse);
            }
        }
    );
}
