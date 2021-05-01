export interface ExpectWillNotChain<TSubject extends Promise<unknown>> {

    /**
     * @example expect(actual).will.not.resolve
     */
    resolve: ExpectWillResolveChain<TSubject>;

    /**
     * @example expect(actual).will.not.reject
     */
    reject: ExpectWillRejectChain<TSubject>;
}

export function createExpectWillNotChain<TSubject extends Promise<unknown>>(subject: TSubject): ExpectWillNotChain<TSubject> {
    return Object.assign(
        {},
        {
            get resolve(): ExpectWillNotResolveChain<TSubject> {
                return createExpectWillNotResolveChain(subject);
            },
            get reject(): ExpectWillNotRejectChain<TSubject> {
                return createExpectWillRejectChain(subject);
            }
        }
    );
}
