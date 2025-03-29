import type { Test } from '../test';
import { TestCase } from '../test-case';
import type { TestGroup } from '../test-group';
import { TestReporter } from './test-reporter';
import type { TestReporterEvent } from './events';
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

// https://testanything.org/tap-version-14-specification.html
export class TAPTestReporter extends TestReporter {
    private readonly currentTestPointIds: number[] = [
        1
    ];
    private depth: number = 0;
    // eslint-disable-next-line @typescript-eslint/class-literal-property-style
    private readonly tabSize: number = 4;

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
                    this.writePlan(event.testRunner.testsAndTestGroups.length);
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
                    this.writeSubtest(event.testGroup);

                    this.incrementDepth();

                    break;
                }

                case TestGroupEventType.Error: {
                    break;
                }

                case TestGroupEventType.End: {
                    this.writePlan(event.testGroup.testsAndTestGroups.length);

                    this.decrementDepth();

                    this.writeTestPoint(event.testGroup);

                    this.currentTestPointIds[this.depth] += 1;

                    break;
                }

                default:
            }
        }
        else if (event instanceof TestEvent) {
            switch (event.type) {
                case TestEventType.Start: {
                    if (event.test.testCases.length > 0) {
                        this.writeSubtest(event.test);

                        this.incrementDepth();
                    }

                    break;
                }

                case TestEventType.Error: {
                    break;
                }

                case TestEventType.End: {
                    if (event.test.testCases.length > 0) {
                        this.writePlan(event.test.totalTestCaseCount);

                        this.decrementDepth();
                    }

                    this.writeTestPoint(event.test);

                    this.currentTestPointIds[this.depth] += 1;

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
                    this.writeTestPoint(event.testCase);

                    this.currentTestPointIds[this.depth] += 1;

                    break;
                }

                default:
            }
        }
    }

    private writeLine(message: string = ''): void {
        process.stdout.write(`\n${' '.repeat(this.depth * this.tabSize)}${message}`);
    }

    private writeSubtest(testGroupOrTest: TestGroup | Test): void {
        this.writeLine(`# Subtest: ${this.escapeHashesAndSlashes(testGroupOrTest.label)}`);
    }

    private writeTestPoint(testGroupOrTestOrTestCase: TestGroup | Test | TestCase): void {
        let label: string;

        if (testGroupOrTestOrTestCase instanceof TestCase) {
            // eslint-disable-next-line @typescript-eslint/no-magic-numbers
            label = testGroupOrTestOrTestCase.label === undefined ? toDisplayString(testGroupOrTestOrTestCase.value, 20) : testGroupOrTestOrTestCase.label;
        }
        else {
            label = testGroupOrTestOrTestCase.label;
        }

        this.writeLine(`${testGroupOrTestOrTestCase.failed ? 'not ' : ''}ok ${this.currentTestPointIds[this.depth]} - ${this.escapeHashesAndSlashes(label)}`);
    }

    private writePlan(count: number): void {
        this.writeLine(`1..${count}`);
    }

    private escapeHashesAndSlashes(value: string): string {
        return value.replace('#', '\\#').replace('\\', '\\\\');
    }

    private incrementDepth(): void {
        this.depth += 1;

        this.currentTestPointIds.push(1);
    }

    private decrementDepth(): void {
        this.depth -= 1;

        this.currentTestPointIds.pop();
    }
}
