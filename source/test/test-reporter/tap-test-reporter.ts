import { TestReporter } from './test-reporter';
import {
    toDisplayString
} from '@colonise/utilities';
import {
    TestCaseEvent,
    TestCaseEventType,
    TestEvent,
    TestEventType,
    TestGroupEvent,
    TestGroupEventType,
    TestRunnerEvent,
    TestRunnerEventType
} from './events';
import type {
    TestReporterEvent
} from './events';

// https://testanything.org/tap-version-14-specification.html
export class TAPTestReporter extends TestReporter {
    private currentTestPointId = 1;

    // eslint-disable-next-line max-lines-per-function, max-statements, complexity
    public onEvent(event: TestReporterEvent): void {
        if (event instanceof TestRunnerEvent) {
            switch (event.type) {
                case TestRunnerEventType.CollectStart: {
                    break;
                }

                case TestRunnerEventType.CollectEnd: {
                    break;
                }

                case TestRunnerEventType.Start: {
                    this.writeLine('TAP version 14');
                    break;
                }

                case TestRunnerEventType.End: {
                    // Must be run at end, since totalTestCaseCount is accumulated over time because everything is promises
                    this.writeLine(`1..${event.testRunner.totalTestCaseCount}`);
                    this.writeLine();
                    break;
                }

                case TestRunnerEventType.Error: {
                    break;
                }

                default:
            }
        }
        else if (event instanceof TestGroupEvent) {
            switch (event.type) {
                case TestGroupEventType.Start: {
                    break;
                }

                case TestGroupEventType.Error: {
                    break;
                }

                case TestGroupEventType.End: {
                    break;
                }

                default:
            }
        }
        else if (event instanceof TestEvent) {
            switch (event.type) {
                case TestEventType.Start: {
                    break;
                }

                case TestEventType.Error: {
                    break;
                }

                case TestEventType.End: {
                    if (event.test.testCases.length === 0) {
                        this.writeLine(`${event.test.failed ? 'not ' : ''}ok ${this.currentTestPointId} - ${this.escapeHashesAndSlashes(event.test.label)}`)

                        this.currentTestPointId += 1;
                    }

                    break;
                }

                default:
            }
        }
        else if (event instanceof TestCaseEvent) {
            switch (event.type) {
                case TestCaseEventType.Start: {
                    break;
                }

                case TestCaseEventType.Error: {
                    break;
                }

                case TestCaseEventType.End: {
                    const label = this.escapeHashesAndSlashes(event.testCase.label === undefined ? toDisplayString(event.testCase.value, 20) : `'${event.testCase.label}'`);

                    this.writeLine(`${event.testCase.failed ? 'not ' : ''}ok ${this.currentTestPointId} - ${label}`)

                    this.currentTestPointId += 1;

                    break;
                }

                default:
            }
        }
    }

    private writeLine(message: string = ''): void {
        process.stdout.write(`\n${message}`);
    }

    private escapeHashesAndSlashes(value: string): string {
        return value.replace('#', '\\#').replace('\\', '\\\\');
    }
}
