import { testGroup, test } from '../test';
import { expect } from './expect';

testGroup('expect(subject)', () => {
    testGroup('expect(subject).to', () => {
        testGroup('expect(subject).to.be', () => {
            test('expect(subject).to.be(any)', () => {
                expect(1).to.be(1);
            });

            test('expect(subject).to.be(any, strict)', () => {
                expect(1).to.be(1, true);
            });

            testGroup('expect(subject).to.be.a', () => {
                test('expect(subject).to.be.a(Constructor)', () => {
                    expect(new Date()).to.be.a(Date);
                });

                test('expect(subject).to.be.a(string)', () => {
                    expect(1).to.be.a('number');
                });

                test('expect(subject).to.be.a.string()', () => {
                    expect('a').to.be.a.string();
                });

                test('expect(subject).to.be.a.number()', () => {
                    expect(1).to.be.a.number();
                });

                test('expect(subject).to.be.a.bigint()', () => {
                    expect(BigInt(1)).to.be.a.bigint();
                });

                test('expect(subject).to.be.a.boolean()', () => {
                    expect(true).to.be.a.boolean();
                });

                test('expect(subject).to.be.a.symbol()', () => {
                    expect(Symbol('a')).to.be.a.symbol();
                });

                test('expect(subject).to.be.a.function()', () => {
                    expect(() => 1).to.be.a.function();
                });
            });

            testGroup('expect(subject).to.be.an', () => {
                test('expect(subject).to.be.an(Constructor)', () => {
                    expect({}).to.be.an(Object);
                });

                test('expect(subject).to.be.an(string)', () => {
                    expect({}).to.be.an('object');
                });

                testGroup('expect(subject).to.be.an.instance', () => {
                    testGroup('expect(subject).to.be.instance.of', () => {
                        test('expect(subject).to.be.instance.of(Constructor)', () => {
                            expect({}).to.be.an.instance.of(Object);
                        });
                    });
                });

                test('expect(subject).to.be.an.object()', () => {
                    expect({}).to.be.an.object();
                });
            });

            test('expect(subject).to.be.defined()', () => {
                expect(1).to.be.defined();
            });

            test('expect(subject).to.be.null()', () => {
                expect(null).to.be.null();
            });

            test('expect(subject).to.be.undefined()', () => {
                expect(undefined).to.be.undefined();
            });

            test('expect(subject).to.be.truthy()', () => {
                expect(1).to.be.truthy();
            });

            test('expect(subject).to.be.falsey()', () => {
                expect(0).to.be.falsey();
            });

            test('expect(subject).to.be.in(object)', () => {
                expect('a').to.be.in({ 'a': 1 });
            });
        });

        testGroup('expect(subject).to.return', () => {
            test('expect(subject).to.return()', () => {
                expect(() => { }).to.return();
            });

            test('expect(subject).to.return(any)', () => {
                expect(() => 1).to.return(1);
            });

            test('expect(subject).to.return(any, strict)', () => {
                expect(() => 1).to.return(1, true);
            });

            testGroup('expect(subject).to.return.a', () => {
                test('expect(subject).to.return.a(Constructor)', () => {
                    expect(() => new Date()).to.return.a(Date);
                });

                test('expect(subject).to.return.a(string)', () => {
                    expect(() => 1).to.return.a('number');
                });

                test('expect(subject).to.return.a.string()', () => {
                    expect(() => 'a').to.return.a.string();
                });

                test('expect(subject).to.return.a.number()', () => {
                    expect(() => 1).to.return.a.number();
                });

                test('expect(subject).to.return.a.bigint()', () => {
                    expect(() => BigInt(1)).to.return.a.bigint();
                });

                test('expect(subject).to.return.a.boolean()', () => {
                    expect(() => true).to.return.a.boolean();
                });

                test('expect(subject).to.return.a.symbol()', () => {
                    expect(() => Symbol('a')).to.return.a.symbol();
                });

                test('expect(subject).to.return.a.function()', () => {
                    expect(() => () => 1).to.return.a.function();
                });
            });

            testGroup('expect(subject).to.return.an', () => {
                test('expect(subject).to.return.an(Constructor)', () => {
                    expect(() => { }).to.return.an(Object);
                });

                test('expect(subject).to.return.an(string)', () => {
                    expect(() => { }).to.return.an('object');
                });

                testGroup('expect(subject).to.return.an.instance', () => {
                    testGroup('expect(subject).to.return.instance.of', () => {
                        test('expect(subject).to.return.instance.of(Constructor)', () => {
                            expect(() => { }).to.return.an.instance.of(Object);
                        });
                    });
                });

                test('expect(subject).to.return.an.object()', () => {
                    expect(() => { }).to.return.an.object();
                });
            });

        });

        testGroup('expect(subject).to.throw', () => {
            test('expect(subject).to.throw()', () => {
                expect(() => { throw 1; }).to.throw();
            });

            test('expect(subject).to.throw(any)', () => {
                expect(() => { throw 1; }).to.throw(1);
            });

            test('expect(subject).to.throw(any, strict)', () => {
                expect(() => { throw 1; }).to.throw(1, true);
            });

            testGroup('expect(subject).to.throw.a', () => {
                test('expect(subject).to.throw.a(Constructor)', () => {
                    expect(() => { throw new Date(); }).to.throw.a(Date);
                });

                test('expect(subject).to.throw.a(string)', () => {
                    expect(() => { throw 1; }).to.throw.a('number');
                });

                test('expect(subject).to.throw.a.string()', () => {
                    expect(() => { throw 'a'; }).to.throw.a.string();
                });

                test('expect(subject).to.throw.a.number()', () => {
                    expect(() => { throw 1; }).to.throw.a.number();
                });

                test('expect(subject).to.throw.a.bigint()', () => {
                    expect(() => { throw BigInt(1); }).to.throw.a.bigint();
                });

                test('expect(subject).to.throw.a.boolean()', () => {
                    expect(() => { throw true; }).to.throw.a.boolean();
                });

                test('expect(subject).to.throw.a.symbol()', () => {
                    expect(() => { throw Symbol('a'); }).to.throw.a.symbol();
                });

                test('expect(subject).to.throw.a.function()', () => {
                    expect(() => { throw () => 1; }).to.throw.a.function();
                });
            });

            testGroup('expect(subject).to.throw.an', () => {
                test('expect(subject).to.throw.an(Constructor)', () => {
                    expect(() => { throw {}; }).to.throw.an(Object);
                });

                test('expect(subject).to.throw.an(string)', () => {
                    expect(() => { throw {}; }).to.throw.an('object');
                });

                testGroup('expect(subject).to.throw.an.instance', () => {
                    testGroup('expect(subject).to.throw.instance.of', () => {
                        test('expect(subject).to.throw.instance.of(Constructor)', () => {
                            expect(() => { throw {}; }).to.throw.an.instance.of(Object);
                        });
                    });
                });

                test('expect(subject).to.throw.an.object()', () => {
                    expect(() => { throw {}; }).to.throw.an.object();
                });
            });
        });

        testGroup('expect(subject).to.resolve', () => {
            test('expect(subject).to.resolve()', () => {
                expect(Promise.resolve(1)).to.resolve();
            });

            test('expect(subject).to.resolve(any)', () => {
                expect(Promise.resolve(1)).to.resolve(1);
            });

            test('expect(subject).to.resolve(any, strict)', () => {
                expect(Promise.resolve(1)).to.resolve(1, true);
            });
        });

        testGroup('expect(subject).to.reject', () => {
            test('expect(subject).to.reject()', () => {
                expect(Promise.reject(1)).to.reject();
            });

            test('expect(subject).to.reject(any)', () => {
                expect(Promise.reject(1)).to.reject(1);
            });

            test('expect(subject).to.reject(any, strict)', () => {
                expect(Promise.reject(1)).to.reject(1, true);
            });
        });

        test('expect(subject).to.equal(any)', () => {
            expect(1).to.equal(1);
        });

        test('expect(subject).to.equal(any, strict)', () => {
            expect(1).to.equal(1, true);
        });
    });

    testGroup('expect(subject).is', () => {
        test('expect(subject).is(any)', () => {
            expect(1).is(1);
        });

        test('expect(subject).is(any, strict)', () => {
            expect(1).is(1, true);
        });

        testGroup('expect(subject).is.a', () => {
            test('expect(subject).is.a(Constructor)', () => {
                expect(new Date()).is.a(Date);
            });

            test('expect(subject).is.a(string)', () => {
                expect(1).is.a('number');
            });

            test('expect(subject).is.a.string()', () => {
                expect('a').is.a.string();
            });

            test('expect(subject).is.a.number()', () => {
                expect(1).is.a.number();
            });

            test('expect(subject).is.a.bigint()', () => {
                expect(BigInt(1)).is.a.bigint();
            });

            test('expect(subject).is.a.boolean()', () => {
                expect(true).is.a.boolean();
            });

            test('expect(subject).is.a.symbol()', () => {
                expect(Symbol('a')).is.a.symbol();
            });

            test('expect(subject).is.a.function()', () => {
                expect(() => 1).is.a.function();
            });
        });

        testGroup('expect(subject).is.an', () => {
            test('expect(subject).is.an(Constructor)', () => {
                expect({}).is.an(Object);
            });

            test('expect(subject).is.an(string)', () => {
                expect({}).is.an('object');
            });

            testGroup('expect(subject).is.an.instance', () => {
                testGroup('expect(subject).is.instance.of', () => {
                    test('expect(subject).is.instance.of(Constructor)', () => {
                        expect({}).is.an.instance.of(Object);
                    });
                });
            });

            test('expect(subject).is.an.object()', () => {
                expect({}).is.an.object();
            });
        });

        testGroup('expect(subject).is.not', () => {
            testGroup('expect(subject).is.not.a', () => {
                test('expect(subject).is.not.a(Constructor)', () => {
                    expect(1).is.not.a(String);
                });

                test('expect(subject).is.not.a(string)', () => {
                    expect(1).is.not.a('string');
                });
            });

            testGroup('expect(subject).is.not.an', () => {
                test('expect(subject).is.not.an(Constructor)', () => {
                    expect(1).is.not.an(Object);
                });

                test('expect(subject).is.not.an(string)', () => {
                    expect(1).is.not.an('object');
                });

                testGroup('expect(subject).is.not.an.instance', () => {
                    test('expect(subject).is.not.an.instance.of(Constructor)', () => {
                        expect(1).is.not.an.instance.of(Object);
                    });
                });
            });
        });

        test('expect(subject).is.defined()', () => {
            expect(1).is.defined();
        });

        test('expect(subject).is.null()', () => {
            expect(null).is.null();
        });

        test('expect(subject).is.undefined()', () => {
            expect(undefined).is.undefined();
        });

        test('expect(subject).is.truthy()', () => {
            expect(1).is.truthy();
        });

        test('expect(subject).is.falsey()', () => {
            expect(0).is.falsey();
        });

        test('expect(subject).is.in(object)', () => {
            expect('a').is.in({ 'a': 1 });
        });
    });

    testGroup('expect(subject).not.to', () => {
        testGroup('expect(subject).not.to.be', () => {
            test('expect(subject).not.to.be(any)', () => {
                expect(1).is(1);
            });

            test('expect(subject).not.to.be(any, strict)', () => {
                expect(1).is(1, true);
            });

            testGroup('expect(subject).not.to.be.a', () => {
                test('expect(subject).not.to.be.a(Constructor)', () => {
                    expect(new Date()).not.to.be.a(Date);
                });

                test('expect(subject).not.to.be.a(string)', () => {
                    expect(1).not.to.be.a('number');
                });

                test('expect(subject).not.to.be.a.string()', () => {
                    expect('a').not.to.be.a.string();
                });

                test('expect(subject).not.to.be.a.number()', () => {
                    expect(1).not.to.be.a.number();
                });

                test('expect(subject).not.to.be.a.bigint()', () => {
                    expect(BigInt(1)).not.to.be.a.bigint();
                });

                test('expect(subject).not.to.be.a.boolean()', () => {
                    expect(true).not.to.be.a.boolean();
                });

                test('expect(subject).not.to.be.a.symbol()', () => {
                    expect(Symbol('a')).not.to.be.a.symbol();
                });

                test('expect(subject).not.to.be.a.function()', () => {
                    expect(() => 1).not.to.be.a.function();
                });
            });

            testGroup('expect(subject).not.to.be.an', () => {
                test('expect(subject).not.to.be.an(Constructor)', () => {
                    expect({}).not.to.be.an(Object);
                });

                test('expect(subject).not.to.be.an(string)', () => {
                    expect({}).not.to.be.an('object');
                });

                testGroup('expect(subject).not.to.be.an.instance', () => {
                    testGroup('expect(subject).not.to.be.instance.of', () => {
                        test('expect(subject).not.to.be.instance.of(Constructor)', () => {
                            expect({}).not.to.be.an.instance.of(Object);
                        });
                    });
                });

                test('expect(subject).not.to.be.an.object()', () => {
                    expect({}).not.to.be.an.object();
                });
            });

            test('expect(subject).not.to.be.defined()', () => {
                expect(1).not.to.be.defined();
            });

            test('expect(subject).not.to.be.null()', () => {
                expect(null).not.to.be.null();
            });

            test('expect(subject).not.to.be.undefined()', () => {
                expect(undefined).not.to.be.undefined();
            });

            test('expect(subject).not.to.be.truthy()', () => {
                expect(1).not.to.be.truthy();
            });

            test('expect(subject).not.to.be.falsey()', () => {
                expect(0).not.to.be.falsey();
            });

            test('expect(subject).not.to.be.in(object)', () => {
                expect('a').not.to.be.in({ 'a': 1 });
            });
        });

        testGroup('expect(subject).not.to.return', () => {
            test('expect(subject).not.to.return()', () => {
                expect(() => { }).not.to.return();
            });

            test('expect(subject).not.to.return(any)', () => {
                expect(() => 1).not.to.return(1);
            });

            test('expect(subject).not.to.return(any, strict)', () => {
                expect(() => 1).not.to.return(1, true);
            });

            testGroup('expect(subject).not.to.return.a', () => {
                test('expect(subject).not.to.return.a(Constructor)', () => {
                    expect(() => new Date()).not.to.return.a(Date);
                });

                test('expect(subject).not.to.return.a(string)', () => {
                    expect(() => 1).not.to.return.a('number');
                });

                test('expect(subject).not.to.return.a.string()', () => {
                    expect(() => 'a').not.to.return.a.string();
                });

                test('expect(subject).not.to.return.a.number()', () => {
                    expect(() => 1).not.to.return.a.number();
                });

                test('expect(subject).not.to.return.a.bigint()', () => {
                    expect(() => BigInt(1)).not.to.return.a.bigint();
                });

                test('expect(subject).not.to.return.a.boolean()', () => {
                    expect(() => true).not.to.return.a.boolean();
                });

                test('expect(subject).not.to.return.a.symbol()', () => {
                    expect(() => Symbol('a')).not.to.return.a.symbol();
                });

                test('expect(subject).not.to.return.a.function()', () => {
                    expect(() => () => 1).not.to.return.a.function();
                });
            });

            testGroup('expect(subject).not.to.return.an', () => {
                test('expect(subject).not.to.return.an(Constructor)', () => {
                    expect(() => { }).not.to.return.an(Object);
                });

                test('expect(subject).not.to.return.an(string)', () => {
                    expect(() => { }).not.to.return.an('object');
                });

                testGroup('expect(subject).not.to.return.an.instance', () => {
                    testGroup('expect(subject).not.to.return.instance.of', () => {
                        test('expect(subject).not.to.return.instance.of(Constructor)', () => {
                            expect(() => { }).not.to.return.an.instance.of(Object);
                        });
                    });
                });

                test('expect(subject).not.to.return.an.object()', () => {
                    expect(() => { }).not.to.return.an.object();
                });
            });

            testGroup('expect(subject).not.to.throw', () => {
                test('expect(subject).not.to.throw()', () => {
                    expect(() => { throw 1; }).not.to.throw();
                });

                test('expect(subject).not.to.throw(any)', () => {
                    expect(() => { throw 1; }).not.to.throw(1);
                });

                test('expect(subject).not.to.throw(any, strict)', () => {
                    expect(() => { throw 1; }).not.to.throw(1, true);
                });

                testGroup('expect(subject).not.to.throw.a', () => {
                    test('expect(subject).not.to.throw.a(Constructor)', () => {
                        expect(() => { throw new Date(); }).not.to.throw.a(Date);
                    });

                    test('expect(subject).not.to.throw.a(string)', () => {
                        expect(() => { throw 1; }).not.to.throw.a('number');
                    });

                    test('expect(subject).not.to.throw.a.string()', () => {
                        expect(() => { throw 'a'; }).not.to.throw.a.string();
                    });

                    test('expect(subject).not.to.throw.a.number()', () => {
                        expect(() => { throw 1; }).not.to.throw.a.number();
                    });

                    test('expect(subject).not.to.throw.a.bigint()', () => {
                        expect(() => { throw BigInt(1); }).not.to.throw.a.bigint();
                    });

                    test('expect(subject).not.to.throw.a.boolean()', () => {
                        expect(() => { throw true; }).not.to.throw.a.boolean();
                    });

                    test('expect(subject).not.to.throw.a.symbol()', () => {
                        expect(() => { throw Symbol('a'); }).not.to.throw.a.symbol();
                    });

                    test('expect(subject).not.to.throw.a.function()', () => {
                        expect(() => { throw () => 1; }).not.to.throw.a.function();
                    });
                });

                testGroup('expect(subject).not.to.throw.an', () => {
                    test('expect(subject).not.to.throw.an(Constructor)', () => {
                        expect(() => { throw {}; }).not.to.throw.an(Object);
                    });

                    test('expect(subject).not.to.throw.an(string)', () => {
                        expect(() => { throw {}; }).not.to.throw.an('object');
                    });

                    testGroup('expect(subject).not.to.throw.an.instance', () => {
                        testGroup('expect(subject).not.to.throw.instance.of', () => {
                            test('expect(subject).not.to.throw.instance.of(Constructor)', () => {
                                expect(() => { throw {}; }).not.to.throw.an.instance.of(Object);
                            });
                        });
                    });

                    test('expect(subject).not.to.throw.an.object()', () => {
                        expect(() => { throw {}; }).not.to.throw.an.object();
                    });
                });
            });

            testGroup('expect(subject).not.to.resolve', () => {
                test('expect(subject).not.to.resolve()', async () => {
                    await expect(Promise.resolve(1)).not.to.resolve();
                });

                test('expect(subject).not.to.resolve(any)', async () => {
                    await expect(Promise.resolve(1)).not.to.resolve(1);
                });

                test('expect(subject).not.to.resolve(any, strict)', async () => {
                    await expect(Promise.resolve(1)).not.to.resolve(1, true);
                });
            });

            testGroup('expect(subject).not.to.reject', () => {
                test('expect(subject).not.to.reject()', async () => {
                    await expect(Promise.reject(1)).not.to.reject();
                });

                test('expect(subject).not.to.reject(any)', async () => {
                    await expect(Promise.reject(1)).not.to.reject(1);
                });

                test('expect(subject).not.to.reject(any, strict)', async () => {
                    await expect(Promise.reject(1)).not.to.reject(1, true);
                });
            });

            test('expect(subject).not.to.equal(any)', () => {
                expect(1).not.to.equal(1);
            });

            test('expect(subject).not.to.equal(any, strict)', () => {
                expect(1).not.to.equal(1, true);
            });
        });
    });

    testGroup('expect(subject).will', () => {
        testGroup('expect(subject).will.resolve', () => {
            test('expect(subject).will.resolve()', async () => {
                await expect(Promise.resolve(1)).will.resolve();
            });

            test('expect(subject).will.resolve(any)', async () => {
                await expect(Promise.resolve(1)).will.resolve(1);
            });

            test('expect(subject).will.resolve(any, strict)', async () => {
                await expect(Promise.resolve(1)).will.resolve(1, true);
            });
        });

        testGroup('expect(subject).will.reject', () => {
            test('expect(subject).will.reject()', async () => {
                await expect(Promise.reject(1)).will.reject();
            });

            test('expect(subject).will.reject(any)', async () => {
                await expect(Promise.reject(1)).will.reject(1);
            });

            test('expect(subject).will.reject(any, strict)', async () => {
                await expect(Promise.reject(1)).will.reject(1, true);
            });
        });

        testGroup('expect(subject).will.not', () => {
            testGroup('expect(subject).will.not.resolve', () => {
                test('expect(subject).will.not.resolve()', async () => {
                    await expect(Promise.resolve(1)).will.not.resolve();
                });

                test('expect(subject).will.not.resolve(any)', async () => {
                    await expect(Promise.resolve(1)).will.not.resolve(1);
                });

                test('expect(subject).will.not.resolve(any, strict)', async () => {
                    await expect(Promise.resolve(1)).will.not.resolve(1, true);
                });
            });

            testGroup('expect(subject).will.not.reject', () => {
                test('expect(subject).will.not.reject()', async () => {
                    await expect(Promise.reject(1)).will.not.reject();
                });

                test('expect(subject).will.not.reject(any)', async () => {
                    await expect(Promise.reject(1)).will.not.reject(1);
                });

                test('expect(subject).will.not.reject(any, strict)', async () => {
                    await expect(Promise.reject(1)).will.not.reject(1, true);
                });
            });
        });
    });

    testGroup('expect(subject).returns', () => {
        test('expect(subject).returns()', () => {
            expect(() => { }).returns();
        });

        test('expect(subject).returns(any)', () => {
            expect(() => 1).returns(1);
        });

        test('expect(subject).returns(any, strict)', () => {
            expect(() => 1).returns(1, true);
        });

        testGroup('expect(subject).returns.a', () => {
            test('expect(subject).returns.a(Constructor)', () => {
                expect(() => new Date()).returns.a(Date);
            });

            test('expect(subject).returns.a(string)', () => {
                expect(() => 1).returns.a('number');
            });

            test('expect(subject).returns.a.string()', () => {
                expect(() => 'a').returns.a.string();
            });

            test('expect(subject).returns.a.number()', () => {
                expect(() => 1).returns.a.number();
            });

            test('expect(subject).returns.a.bigint()', () => {
                expect(() => BigInt(1)).returns.a.bigint();
            });

            test('expect(subject).returns.a.boolean()', () => {
                expect(() => true).returns.a.boolean();
            });

            test('expect(subject).returns.a.symbol()', () => {
                expect(() => Symbol('a')).returns.a.symbol();
            });

            test('expect(subject).returns.a.function()', () => {
                expect(() => () => 1).returns.a.function();
            });
        });

        testGroup('expect(subject).returns.an', () => {
            test('expect(subject).returns.an(Constructor)', () => {
                expect(() => { }).returns.an(Object);
            });

            test('expect(subject).returns.an(string)', () => {
                expect(() => { }).returns.an('object');
            });

            testGroup('expect(subject).returns.an.instance', () => {
                testGroup('expect(subject).returns.instance.of', () => {
                    test('expect(subject).returns.instance.of(Constructor)', () => {
                        expect(() => { }).returns.an.instance.of(Object);
                    });
                });
            });

            test('expect(subject).returns.an.object()', () => {
                expect(() => { }).returns.an.object();
            });
        });

    });

    testGroup('expect(subject).throws', () => {
        test('expect(subject).throws()', () => {
            expect(() => { throw 1; }).throws();
        });

        test('expect(subject).throws(any)', () => {
            expect(() => { throw 1; }).throws(1);
        });

        test('expect(subject).throws(any, strict)', () => {
            expect(() => { throw 1; }).throws(1, true);
        });

        testGroup('expect(subject).throws.a', () => {
            test('expect(subject).throws.a(Constructor)', () => {
                expect(() => { throw new Date(); }).throws.a(Date);
            });

            test('expect(subject).throws.a(string)', () => {
                expect(() => { throw 1; }).throws.a('number');
            });

            test('expect(subject).throws.a.string()', () => {
                expect(() => { throw 'a'; }).throws.a.string();
            });

            test('expect(subject).throws.a.number()', () => {
                expect(() => { throw 1; }).throws.a.number();
            });

            test('expect(subject).throws.a.bigint()', () => {
                expect(() => { throw BigInt(1); }).throws.a.bigint();
            });

            test('expect(subject).throws.a.boolean()', () => {
                expect(() => { throw true; }).throws.a.boolean();
            });

            test('expect(subject).throws.a.symbol()', () => {
                expect(() => { throw Symbol('a'); }).throws.a.symbol();
            });

            test('expect(subject).throws.a.function()', () => {
                expect(() => { throw () => 1; }).throws.a.function();
            });
        });

        testGroup('expect(subject).throws.an', () => {
            test('expect(subject).throws.an(Constructor)', () => {
                expect(() => { throw {}; }).throws.an(Object);
            });

            test('expect(subject).throws.an(string)', () => {
                expect(() => { throw {}; }).throws.an('object');
            });

            testGroup('expect(subject).throws.an.instance', () => {
                testGroup('expect(subject).throws.instance.of', () => {
                    test('expect(subject).throws.instance.of(Constructor)', () => {
                        expect(() => { throw {}; }).throws.an.instance.of(Object);
                    });
                });
            });

            test('expect(subject).throws.an.object()', () => {
                expect(() => { throw {}; }).throws.an.object();
            });
        });
    });

    testGroup('expect(subject).resolves', () => {
        test('expect(subject).resolves()', async () => {
            await expect(Promise.resolve(1)).resolves();
        });

        test('expect(subject).resolves(any)', async () => {
            await expect(Promise.resolve(1)).resolves(1);
        });

        test('expect(subject).resolves(any, strict)', async () => {
            await expect(Promise.resolve(1)).resolves(1, true);
        });
    });

    testGroup('expect(subject).rejects', () => {
        test('expect(subject).rejects()', async () => {
            await expect(Promise.reject(1)).rejects();
        });

        test('expect(subject).rejects(any)', async () => {
            await expect(Promise.reject(1)).rejects(1);
        });

        test('expect(subject).rejects(any, strict)', async () => {
            await expect(Promise.reject(1)).rejects(1, true);
        });
    });

    test('expect(subject).equals(any)', () => {
        expect(1).equals(1);
    });

    test('expect(subject).equals(any, strict)', () => {
        expect(1).equals(1, true);
    });
});
