import type { TestRunner } from '../../../test-runner';
import { TestRunnerEvent } from './test-runner-event';
import { TestRunnerEventType } from './test-runner-event-type';

export class TestRunnerEventError extends TestRunnerEvent<TestRunnerEventType.Error> {
    public readonly message: string;
    public readonly error?: unknown;

    public constructor(testRunner: TestRunner, message: string, error?: unknown) {
        super(TestRunnerEventType.Error, testRunner);

        this.message = message;
        this.error = error;
    }
}
