import { createRejectChain } from './reject';
import { createResolveChain } from './resolve';
import type { RejectChain } from './reject';
import type { ResolveChain } from './resolve';

export interface WillNotChain<TSubject extends Promise<unknown>> {

    /**
     * @example expect(actual).will.resolve
     */
    resolve: ResolveChain<TSubject>;

    /**
     * @example expect(actual).will.reject
     */
    reject: RejectChain<TSubject>;
}

export interface WillChain<TSubject extends Promise<unknown>> extends WillNotChain<TSubject> {

    /**
     * @example expect(actual).will.not
     */
    not: WillNotChain<TSubject>;
}

export function createWillChain<TSubject extends Promise<unknown>>(subject: TSubject, reverse: boolean = false): WillChain<TSubject> {
    return <WillChain<TSubject>>Object.defineProperties(
        {},
        {
            not: {
                get(): WillNotChain<TSubject> {
                    return createWillChain(subject, !reverse);
                }
            },
            resolve: {
                get(): ResolveChain<TSubject> {
                    return createResolveChain(subject, reverse);
                }
            },
            reject: {
                get(): RejectChain<TSubject> {
                    return createRejectChain(subject, reverse);
                }
            }
        }
    );
}
