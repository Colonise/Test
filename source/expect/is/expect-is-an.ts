import type { AnChain } from '../an';
import { createAnChain } from '../an';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ExpectIsAnChain<TSubject> extends AnChain<TSubject> { }

export function createExpectIsAnChain<TSubject>(subject: TSubject): ExpectIsAnChain<TSubject> {
    return createAnChain(subject);
}
