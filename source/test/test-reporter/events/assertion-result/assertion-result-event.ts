import { TestReporterEvent } from '../test-reporter-event';
import type { UnknownAssertionResult } from '../../../../assert/assertion-result';
import type { AssertionResultEventType } from './assertion-result-event-type';

export class AssertionResultEvent<TAssertionResultEventType = AssertionResultEventType> extends TestReporterEvent<TAssertionResultEventType> {
    public readonly assertionResult: UnknownAssertionResult;

    // eslint-disable-next-line @typescript-eslint/no-shadow
    public constructor(type: TAssertionResultEventType, assertionResult: UnknownAssertionResult) {
        super(type);

        this.assertionResult = assertionResult;
    }
}
