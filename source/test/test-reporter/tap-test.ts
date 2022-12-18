import { TestRunner } from '../test-runner';
import { TAPTestReporter } from './tap-test-reporter';

const testRunner = new TestRunner(new TAPTestReporter(), [
    './test-reporter/test.test.ts'
]);

testRunner.collect().then(
    async () => {
        await testRunner.run();
    },
    () => { }
);
