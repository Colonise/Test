import type { Test } from '../../../test';
import type { TestEventType } from './test-event-type';
import { TestReporterEvent } from '../test-reporter-event';

export class TestEvent<TTestEventType = TestEventType> extends TestReporterEvent<TTestEventType> {
    public readonly test: Test;

    // eslint-disable-next-line @typescript-eslint/no-shadow
    public constructor(type: TTestEventType, test: Test) {
        super(type);

        this.test = test;
    }
}
