import { TestRunner } from './test-runner';

const testRunner = new TestRunner([
    './foo.test.ts'
]);

testRunner.collect().then(
    () => {
        for (const testSuite of testRunner.testSuites) {
            console.log(testSuite.name);

            testSuite.run();

            for (const test of testRunner.tests) {
                console.log(test.name);

                test.run();

                for (const testCase of testRunner.testCases) {
                    console.log(testCase.name);

                // TestCase.run();
                }
            }
        }
    },
    () => {}
);
