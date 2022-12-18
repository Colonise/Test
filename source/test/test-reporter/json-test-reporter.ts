import { TestReporter } from './test-reporter';
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
import * as fs from 'fs';

// interface AssertionResultData {

// }

// interface TestCaseData {
//     id: number;
//     assertionResults: AssertionResultData[];
// }

// interface TestData {
//     id: number;
//     assertionResults: AssertionResultData[];
//     testCases: TestCaseData[];
// }

// interface TestGroupData {
//     id: number;
//     tests: TestData[];
//     testGroups: TestGroupData[];
// }

// interface TestRunnerData {
//     tests: TestData[];
//     testGroups: TestGroupData[];
// }

// https://testanything.org/tap-version-14-specification.html
export class JSONTestReporter extends TestReporter {
    private filePath: string;

    public constructor (filePath: string) {
        super();

        this.filePath = filePath;
    }

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
                    break;
                }

                case TestRunnerEventType.End: {
                    fs.writeFileSync(this.filePath, JSON.stringify(this.decycle(event.testRunner), undefined, 4));
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
                    break;
                }

                default:
            }
        }
    }

    // @ts-expect-error
    private decycle(object) {

        // @ts-expect-error
        var objects = [],   // Keep a reference to each unique object or array
            // @ts-expect-error
            paths = [];     // Keep the path to each unique object or array

        // @ts-expect-error
        return (function derez(value, path) {

            // The derez recurses through the object, producing the deep copy.

            var i,          // The loop counter
                name,       // Property name
                nu;         // The new object or array

            var _value = value && value.toJSON instanceof Function ? value.toJSON() : value;
            // typeof null === 'object', so go on if this value is really an object but not
            // one of the weird builtin objects.

            if (typeof _value === 'object' && _value !== null) {

                // If the value is an object or array, look to see if we have already
                // encountered it. If so, return a $ref/path object. This is a hard way,
                // linear search that will get slower as the number of unique objects grows.

                for (i = 0; i < objects.length; i += 1) {
                    // @ts-expect-error
                    if (objects[i] === _value) {
                        // @ts-expect-error
                        return { $ref: paths[i] };
                    }
                }

                // Otherwise, accumulate the unique value and its path.

                objects.push(_value);
                paths.push(path);

                // If it is an array, replicate the array.

                if (Object.prototype.toString.apply(_value) === '[object Array]') {
                    nu = [];
                    for (i = 0; i < _value.length; i += 1) {
                        nu[i] = derez(_value[i], path + '[' + i + ']');
                    }
                } else {

                    // If it is an object, replicate the object.

                    nu = {};
                    for (name in _value) {
                        if (Object.prototype.hasOwnProperty.call(_value, name)) {
                            // @ts-expect-error
                            nu[name] = derez(_value[name],
                                path + '[' + JSON.stringify(name) + ']');
                        }
                    }
                }
                return nu;
            }
            return _value;
        }(object, '$'));
    }
}
