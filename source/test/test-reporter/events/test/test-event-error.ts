import type { Test } from '../../../test';
import { TestEvent } from './test-event';
import { TestEventType } from './test-event-type';

export class TestEventError extends TestEvent<TestEventType.Error> {
    public readonly message: string;
    public readonly error?: unknown;

    // eslint-disable-next-line @typescript-eslint/no-shadow
    public constructor(test: Test, message: string, error?: unknown) {
        super(TestEventType.Error, test);

        this.message = message;
        this.error = error;
    }
}
