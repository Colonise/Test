export interface ExpectWillResolveChain<TSubject extends Promise<unknown>> {

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

export function createExpectWillResolveChain<TSubject extends Promise<unknown>>(subject: TSubject): ExpectWillResolveChain<TSubject> {
    return Object.assign(
        // eslint-disable-next-line id-length, prefer-arrow-callback
        function resolve(): AssertionResult<TSubject, TSubject, TExpected> {
            return assertInstanceOf(subject, expected, true);
        },
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
