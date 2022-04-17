import type { TestCase } from '../../../test-case';
import { TestCaseEvent } from './test-case-event';
import { TestCaseEventType } from './test-case-event-type';

export class TestCaseEventError extends TestCaseEvent<TestCaseEventType.Error> {
    public readonly message: string;
    public readonly error?: unknown;

    // eslint-disable-next-line @typescript-eslint/no-shadow
    public constructor (testCase: TestCase, message: string, error?: unknown) {
        super(TestCaseEventType.Error, testCase);

        this.message = message;
        this.error = error;
    }
}
