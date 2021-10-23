import type { TestGroup } from '../../../test-group';
import { TestGroupEvent } from './test-group-event';
import { TestGroupEventType } from './test-group-event-type';

export class TestGroupEventError extends TestGroupEvent<TestGroupEventType.Error> {
    public readonly message: string;
    public readonly error?: unknown;

    public constructor(testGroup: TestGroup, message: string, error?: unknown) {
        super(TestGroupEventType.Error, testGroup);

        this.message = message;
        this.error = error;
    }
}
