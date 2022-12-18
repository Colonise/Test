import { JSONTestReporter } from './json-test-reporter';
import { TestRunner } from '../test-runner';

const testRunner = new TestRunner(new JSONTestReporter('./source/test/test-reporter/json-test.json'), [
    './test-reporter/test.test.ts'
]);

testRunner.collect().then(
    async () => {
        await testRunner.run();
    },
    () => { }
);
