import { testGroup } from './test-group';

testGroup('testGroup1', () => {
    testGroup('testGroup1a', test => {
        test<number[]>('test1', [], (testCase) => {
        });
    })
});
