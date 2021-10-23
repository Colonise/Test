import type { TestCase } from '../../../test-case';
import type { TestCaseEventType } from './test-case-event-type';
import { TestReporterEvent } from '../test-reporter-event';

export class TestCaseEvent<TTestCaseEventType = TestCaseEventType> extends TestReporterEvent<TTestCaseEventType> {
    public readonly testCase: TestCase;

    public constructor(type: TTestCaseEventType, testCase: TestCase) {
        super(type);

        this.testCase = testCase;
    }
}
