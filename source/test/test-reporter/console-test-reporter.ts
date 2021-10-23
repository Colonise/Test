import { TestReporter } from './test-reporter';
import {
    isError, toDisplayString
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
    TestEventError,
    TestGroupEventError,
    TestReporterEvent,
    TestRunnerEventError
} from './events';

export class ConsoleTestReporter extends TestReporter {
    private depth: number = 0;
    // eslint-disable-next-line @typescript-eslint/class-literal-property-style
    private readonly tabSize: number = 2;

    // eslint-disable-next-line max-lines-per-function, max-statements, complexity
    public onEvent(event: TestReporterEvent): void {
        if (event instanceof TestRunnerEvent) {
            switch (event.type) {
                case TestRunnerEventType.CollectStart: {
                    this.writeLine('Test Runner: Collecting files...');

                    break;
                }

                case TestRunnerEventType.CollectEnd: {
                    this.rewriteLine(`Test Runner: Collected ${event.testRunner.filePaths.length} files`);

                    break;
                }

                case TestRunnerEventType.Start: {
                    this.writeLine('Test Runner: Started');

                    break;
                }

                case TestRunnerEventType.End: {
                    this.writeLine('Test Runner: Finished');
                    this.writeLine(`Succeeded: ${event.testRunner.succeededTestCaseCount}/${event.testRunner.totalTestCaseCount}`);
                    this.writeLine(`Failed: ${event.testRunner.failedTestCaseCount}/${event.testRunner.totalTestCaseCount}`);

                    break;
                }

                case TestRunnerEventType.Error: {
                    const testRunnerEventError = <TestRunnerEventError>event;

                    this.error(testRunnerEventError.message, testRunnerEventError.error);

                    break;
                }

                default:
            }
        }
        else if (event instanceof TestGroupEvent) {
            switch (event.type) {
                case TestGroupEventType.Start: {
                    this.writeLine(`Test Group: '${event.testGroup.label}'`);

                    this.depth += 1;

                    break;
                }

                case TestGroupEventType.End: {
                    this.depth -= 1;

                    // This.writeLine(`Test Group: '${event.testGroup.label}' Finished`);

                    break;
                }

                case TestGroupEventType.Error: {
                    const testGroupEventError = <TestGroupEventError>event;

                    this.error(testGroupEventError.message, testGroupEventError.error);

                    break;
                }

                default:
            }
        }
        else if (event instanceof TestEvent) {
            switch (event.type) {
                case TestEventType.Start: {
                    if (event.test.testCases.length > 0) {
                        this.writeLine(`Test: '${event.test.label}'`);
                    }
                    else {
                        this.writeLine(`Test: '${event.test.label}' ...`);
                    }

                    this.depth += 1;

                    break;
                }

                case TestEventType.End: {
                    this.depth -= 1;

                    if (event.test.testCases.length > 0) {
                        // This.writeLine(`Test: '${event.test.label}' Finished`);
                    }
                    else {
                        this.rewriteLine(`Test: '${event.test.label}' ${event.test.succeeded ? '✓' : '✕'}`);
                    }

                    break;
                }

                case TestEventType.Error: {
                    const testEventError = <TestEventError>event;

                    this.error(testEventError.message, testEventError.error);

                    break;
                }

                default:
            }
        }
        else if (event instanceof TestCaseEvent) {
            switch (event.type) {
                case TestCaseEventType.Start: {
                    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                    const label = event.testCase.label === undefined ? toDisplayString(event.testCase.value, 20) : `'${event.testCase.label}'`;

                    this.writeLine(`Test Case: ${label} ...`);

                    this.depth += 1;

                    break;
                }

                case TestCaseEventType.End: {
                    this.depth -= 1;

                    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                    const label = event.testCase.label === undefined ? toDisplayString(event.testCase.value, 20) : `'${event.testCase.label}'`;

                    this.rewriteLine(`Test Case: ${label} ${event.testCase.succeeded ? '✓' : '✕'}`);

                    break;
                }

                default:
            }
        }
    }

    private write(message: string): void {
        process.stdout.write(`${' '.repeat(this.depth * this.tabSize)}${message}`);
    }

    private writeLine(message: string = ''): void {
        process.stdout.write(`\n${' '.repeat(this.depth * this.tabSize)}${message}`);
    }

    private rewriteLine(message: string): void {
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);

        this.write(message);
    }

    private error(message: string, error: unknown): void {
        process.stderr.write(`${message}: ${isError(error) ? error.message : toDisplayString(error)}`);
    }
}
