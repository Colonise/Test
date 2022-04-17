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
    TestReporterEvent,
    TestRunnerEventError
} from './events';
import chalk from 'chalk';
import { TestCase } from '../test-case';
import { Test } from '../test';
import { TestGroup } from '../test-group';
import { UnknownAssertionResult } from '../../assert';

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

                    if (event.testRunner.erroredTestCaseCount > 0) {
                        this.writeLine(`Errored: ${event.testRunner.erroredTestCaseCount}/${event.testRunner.totalTestCaseCount}`);
                    }

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

                    this.incrementDepth();

                    break;
                }

                case TestGroupEventType.Error: {
                    // const testGroupEventError = <TestGroupEventError>event;

                    // this.error(testGroupEventError.message, testGroupEventError.error);

                    break;
                }

                case TestGroupEventType.End: {
                    this.decrementDepth();

                    if (event.testGroup.errored) {
                        this.rewriteLine(`Test Group: '${event.testGroup.label}' ${this.getResultSymbol(event.testGroup)}`);


                        this.incrementDepth();

                        this.error(event.testGroup.error?.message ?? 'Unknown Error', event.testGroup.error?.error);

                        this.decrementDepth();
                    }

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

                    this.incrementDepth();

                    break;
                }

                case TestEventType.Error: {
                    // const testEventError = <TestEventError>event;

                    // this.error(testEventError.message, testEventError.error);

                    break;
                }

                case TestEventType.End: {
                    this.decrementDepth();

                    if (event.test.testCases.length === 0) {
                        this.rewriteLine(`Test: '${event.test.label}' ${this.getResultSymbol(event.test)}`);

                        if (event.test.errored) {
                            this.incrementDepth();

                            this.error(event.test.error?.message ?? 'Unknown Error', event.test.error?.error);

                            this.decrementDepth();
                        }
                        else {
                            if (event.test.failed) {
                                this.writeFailedAssertionResultMessages(event.test.assertionResults);
                            }
                        }
                    }


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

                    this.incrementDepth();

                    break;
                }

                case TestCaseEventType.Error: {
                    // const testCaseEventError = <TestCaseEventError>event;

                    // this.error(testCaseEventError.message, testCaseEventError.error);

                    break;
                }

                case TestCaseEventType.End: {
                    this.decrementDepth();

                    const label = event.testCase.label === undefined ? toDisplayString(event.testCase.value, 20) : `'${event.testCase.label}'`;

                    this.rewriteLine(`Test Case: ${label} ${this.getResultSymbol(event.testCase)}`);

                    if (event.testCase.errored) {
                        this.incrementDepth();

                        this.error(event.testCase.error?.message ?? 'Unknown Error', event.testCase.error?.error);

                        this.decrementDepth();
                    }
                    else {
                        if (event.testCase.failed) {
                            this.writeFailedAssertionResultMessages(event.testCase.assertionResults);
                        }
                    }


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
        process.stderr.write(chalk.red(`\n${' '.repeat(this.depth * this.tabSize)}${message}: ${isError(error) ? error.message : toDisplayString(error)}`));
    }

    private writeFailedAssertionResultMessages(assertionResults: UnknownAssertionResult[]): void {
        this.incrementDepth();

        assertionResults.forEach(assertionResult => {
            if (assertionResult.failed) {
                this.writeLine(chalk.red(assertionResult.message));
            }
        })

        this.decrementDepth();
    }

    private getResultSymbol(testCaseOrTestOrTestGroup: TestCase | Test | TestGroup): string {
        if (testCaseOrTestOrTestGroup.errored) {
            return chalk.red('!');
        }
        else if (testCaseOrTestOrTestGroup.succeeded) {
            return chalk.green('✓');
        }
        else {
            return chalk.red('✕');
        }
    }

    private incrementDepth(): void {
        this.depth += 1;
    }

    private decrementDepth(): void {
        this.depth -= 1;
    }
}
