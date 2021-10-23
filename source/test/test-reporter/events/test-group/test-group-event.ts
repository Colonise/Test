import type { TestGroup } from '../../../test-group';
import type { TestGroupEventType } from './test-group-event-type';
import { TestReporterEvent } from '../test-reporter-event';

export class TestGroupEvent<TTestGroupEventType = TestGroupEventType> extends TestReporterEvent<TTestGroupEventType> {
    public readonly testGroup: TestGroup;

    public constructor(type: TTestGroupEventType, testGroup: TestGroup) {
        super(type);

        this.testGroup = testGroup;
    }
}
