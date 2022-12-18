import { createRejectChain, RejectChain } from './reject';
import { createResolveChain, ResolveChain } from './resolve';

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
    return Object.defineProperties(
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
