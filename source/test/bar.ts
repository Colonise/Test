import { ConsoleTestReporter } from './test-reporter';
import { TestRunner } from './test-runner';

const testRunner = new TestRunner(new ConsoleTestReporter(), [
    './foo.test.ts'
]);

testRunner.collect().then(
    async () => {
        await testRunner.run();
    },
    () => {}
);
