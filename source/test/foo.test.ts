import { testCase } from './test-case';
import { test } from './test';
import { testSuite } from './test-suite';

testSuite('testSuite1', () => {
    test('test1', () => {
        testCase('testCase1', []);
    });
});
