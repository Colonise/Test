import { ConsoleTestReporter } from './console-test-reporter';
import { TestRunner } from '../test-runner';

const testRunner = new TestRunner(new ConsoleTestReporter(), [
    './test-reporter/test.test.ts'
]);

testRunner.collect().then(
    async () => {
        await testRunner.run();
    },
    () => { }
);
