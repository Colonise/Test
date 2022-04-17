import { assert } from '../assert';
import { test } from './test';
import { testCase } from './test-case';
import { testGroup } from './test-group';

test('t1', async () => {
    await new Promise(resolve => setTimeout(resolve, 200));

    assert(1).isTypeOf('number');
});

test<number>('t2', [1, 2, 3], async value => {
    await new Promise(resolve => setTimeout(resolve, 200));

    assert(value).isTypeOf('number');
});

test<number>('t3', [testCase('t3tc1', 1), testCase('t3tc2', 2), testCase('t3tc3', 3)], async value => {
    await new Promise(resolve => setTimeout(resolve, 200));

    assert(value).isTypeOf('number');
});

testGroup('tg1', async () => {
    await new Promise(resolve => setTimeout(resolve, 200));

    test<number>('tg1t1', [testCase('tg1t1tc1', 1), testCase('tg1t1tc2', 2), testCase('tg1t1tc3', 3)], async value => {
        await new Promise(resolve => setTimeout(resolve, 200));

        assert(value).isTypeOf('number');
    });
});

testGroup('tg2', async () => {
    await new Promise(resolve => setTimeout(resolve, 200));

    test<number>('tg2t1', [testCase('tg2t1tc1', 1), testCase('tg2t1tc2', 2), testCase('tg2t1tc3', 3)], async value => {
        await new Promise(resolve => setTimeout(resolve, 200));

        assert(value).isTypeOf('number');
    });

    await new Promise(resolve => setTimeout(resolve, 200));

    testGroup('tg2tga', async () => {
        await new Promise(resolve => setTimeout(resolve, 200));

        test<number>('tg2tgat1', [testCase('tg2tgat1tc1', 1), testCase('tg2tgat1tc2', 2), testCase('tg2tgat1tc3', 3)], async value => {
            await new Promise(resolve => setTimeout(resolve, 200));

            assert(value).isTypeOf('number');
        });
    })
});

testGroup('errors', async () => {
    testGroup('tge1', async () => {

        throw new Error('Test Group Error');
    });

    test('te1', async () => {
        throw new Error('Test Error');
    });

    test<number>('te2', [testCase('te2tce1', 1)], async () => {
        throw new Error('Test Case Error');
    });
});
