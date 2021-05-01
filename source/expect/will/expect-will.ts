export interface ExpectWillChain<TSubject extends Promise<unknown>> {

    /**
     * @example expect(actual).will.not
     */
    not: ExpectWillNotChain<TSubject>;

    /**
     * @example expect(actual).will.resolve
     */
    resolve: ExpectWillResolveChain<TSubject>;

    /**
     * @example expect(actual).will.reject
     */
    reject: ExpectWillRejectChain<TSubject>;
}

export function createExpectWillChain<TSubject extends Promise<unknown>>(subject: TSubject): ExpectWillChain<TSubject> {
    return Object.assign(
        {},
        {
            get not(): ExpectWillNotChain<TSubject> {
                return createExpectWillNotChain(subject);
            },
            get resolve(): ExpectWillResolveChain<TSubject> {
                return createExpectWillResolveChain(subject);
            },
            get reject(): ExpectWillRejectChain<TSubject> {
                return createExpectWillRejectChain(subject);
            }
        }
    );
}
