import type { AChain } from '../a';
import { createAChain } from '../a';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ExpectIsAChain<TSubject> extends AChain<TSubject> { }

export function createExpectIsAChain<TSubject>(subject: TSubject): ExpectIsAChain<TSubject> {
    return createAChain(subject);
}
