import { assert } from '../../assert';
import { expect } from '../../expect';
import { test } from '../test';
import { testCase } from '../test-case';
import { testGroup } from '../test-group';

testGroup('Assertions', async () => {
    testGroup('success', async () => {
        test('.equals(expected)', async () => {
            assert(1).equals(1);
            assert('1').equals('1');
            // assert({}).equals({}); // TODO: Fix `toDisplayString()` on plain object causing max call stack
        });
    });

    testGroup('fail', async () => {
        test('.equals(expected)', () => {
            assert(1).equals(2);
            assert('1').equals('2');
            assert([]).equals([]);
        })
    });
});

test('Test1', async () => {
    assert(1).isTypeOf('number');
});

test<number>('Test2', [1, 2, 3], async value => {
    assert(value).isTypeOf('number');
});

test<number>('Test3', [testCase('Test3-TestCase1', 1), testCase('Test3-TestCase2', 2), testCase('Test3-TestCase3', 3)], async value => {
    assert(value).isTypeOf('number');
});

testGroup('TestGroup1', async () => {
    test<number>('TestGroup1-Test1', [testCase('TestGroup1-Test1-TestCase1', 1), testCase('TestGroup1-Test1-TestCase2', 2), testCase('TestGroup1-Test1-TestCase3', 3)], async value => {
        assert(value).isTypeOf('number');
    });
});

testGroup('TestGroup2', async () => {
    test<number>('TestGroup2-Test1', [testCase('TestGroup2-Test1-TestCase1', 1), testCase('TestGroup2-Test1-TestCase2', 2), testCase('TestGroup2-Test1-TestCase3', 3)], async value => {
        assert(value).isTypeOf('number');
    });

    testGroup('TestGroup2-TestGroupA', async () => {
        test<number>('TestGroup2-TestGroupA-Test1', [testCase('TestGroup2-TestGroupA-Test1-TestCase1', 1), testCase('TestGroup2-TestGroupA-Test1-TestCase2', 2), testCase('TestGroup2-TestGroupA-Test1-TestCase3', 3)], async value => {
            assert(value).isTypeOf('number');
        });
    })
});

testGroup('Errors', async () => {
    testGroup('TestGroupError1', async () => {
        throw new Error('Test Group Error');
    });

    test('TestError1', async () => {
        throw new Error('Test Error');
    });

    test<number>('TestError2', [testCase('TestError2-TestCaseError1', 1)], async () => {
        throw new Error('Test Case Error');
    });
});

test('expect-chain', () => {
    // expect()
    expect(1).equals(1);
    expect(1).equals(1, true);
    expect(() => 1).returns();
    expect(() => 1).returns(1);
    expect(() => { throw 1; }).throws();
    expect(() => { throw 1; }).throws(1);
    expect(Promise.resolve()).resolves();
    expect(Promise.resolve(1)).resolves(1);
    expect(Promise.reject()).rejects();
    expect(Promise.reject(1)).rejects(1);

    // expect().is
    {
        expect(1).is(1);
        expect(1).is(1, true);
        expect(1).is.defined();
        expect(null).is.null();
        expect(undefined).is.undefined();
        expect(1).is.truthy();
        expect(0).is.falsey();
        expect(1).is.in({ 1: 1 });

        // expect().is.a
        {
            expect(new Date()).is.a(Date);
            expect(1).is.a('number');
        }

        // expect().is.an
        {
            expect([]).is.an(Array);
            expect([]).is.an('object');
            expect([]).is.an.instance.of(Array);
        }

        // expect().is.not
        {
            expect(2).is.not(1);

            // expect().is.not.a
            {
                expect(1).is.not.a(String);
                expect(1).is.not.a('string');
            }

            // expect().is.not.an
            {
                expect(1).is.not.an(Array);
                expect([]).is.not.an.instance.of(Number);
            }
        }
    }

    // expect().to
    {
        expect(1).to.equal(1);

        // expect().to.return
        {
            expect(() => { }).to.return();
            expect(() => 1).to.return(1);

            // expect().to.return.a
            {
                expect(() => 1).to.return.a(Number);
            }

            // expect().to.return.an
            {
                expect(() => []).to.return.an(Array);
                expect(() => []).to.return.an.instance.of(Array);
            }
        }

        // expect().to.throw
        {
            expect(() => { throw 1; }).to.throw();
            expect(() => { throw 1; }).to.throw(1);

            // expect().to.throw.a
            {
                expect(() => { throw []; }).to.throw.a(Array);
            }

            // expect().to.throw.an
            {
                expect(() => { throw []; }).to.throw.an(Array);
                expect(() => { throw []; }).to.throw.an.instance.of(Array);
            }
        }

        // expect().to.be
        {
            expect(1).to.be(1);
        }

        // expect().to.be.a
        {
            expect([]).to.be.a(Array);
        }

        // expect().to.be.an
        {
            expect([]).to.be.an(Array);
            expect([]).to.be.an.instance.of(Array);
        }

        // expect().to.not
        {
            expect(1).to.not.equal(2);
            expect(() => { throw 1; }).to.not.return();
            expect(() => 2).to.not.return(1);
            expect(() => 1).to.not.throw();
            expect(() => { throw 2; }).to.not.throw(1);
        }

        // expect().to.not.be
        {
            expect(1).to.not.be(2);
        }

        // expect().to.not.be.a
        {
            expect([]).to.not.be.a(Number);
        }

        // expect().to.not.be.an
        {
            expect([]).to.not.be.an(Number);
            expect([]).to.not.be.an.instance.of(Number);
        }
    }

    // expect().will
    {

        expect(Promise.resolve()).will.resolve();
        expect(Promise.resolve(1)).will.resolve(1);
        expect(Promise.reject()).will.reject();
        expect(Promise.reject(1)).will.reject(1);


        // expect().will.not
        {
            expect(Promise.reject()).will.not.resolve();
            expect(Promise.reject(1)).will.not.resolve(1);
            expect(Promise.resolve()).will.not.reject();
            expect(Promise.resolve(1)).will.not.reject(1);
        }
    }

    // expect().not
    {
        // expect().not.to
        {
            expect(() => { throw 1; }).not.to.return();
            expect(() => 2).not.to.return(1);
            expect(() => 1).not.to.throw();
            expect(() => { throw 2; }).not.to.throw(1);
        }
    }

    // expect().and

    testCase('equals', () => {
        expect(1).equals(1);
    });

    testCase('throws', () => {
        expect(() => { throw 1; }).throws(1);
    });
})
