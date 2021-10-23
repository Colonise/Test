import { TestReporterEvent } from '../test-reporter-event';
import type { TestRunner } from '../../../test-runner';
import type { TestRunnerEventType } from './test-runner-event-type';

export class TestRunnerEvent<TTestRunnerEventType = TestRunnerEventType> extends TestReporterEvent<TTestRunnerEventType> {
    public readonly testRunner: TestRunner;

    public constructor(type: TTestRunnerEventType, testRunner: TestRunner) {
        super(type);

        this.testRunner = testRunner;
    }
}
