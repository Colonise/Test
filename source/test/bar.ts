import { TestRunner } from './test-runner';

const testRunner = new TestRunner([
    './foo.test.ts'
]);

testRunner.collect().then(
    async () => {
        await testRunner.run();
    },
    () => {}
);
