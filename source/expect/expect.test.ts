import { testSuite, test } from '../test';
import { expect } from './expect';

testSuite('expect-chain', () => {
    // expect()
    expect(1).equals(1);
    expect(() => { }).returns();
    expect(() => 1).returns(1);
    expect(() = { throw 1; }).throws();
    expect(() = { throw 1; }).throws(1);
    expect(Promise.resolve()).resolves();
    expect(Promise.reject()).rejects();

    // expect().is
    expect(1).is(1);
    expect(1).is.defined();
    expect(null).is.null();
    expect(undefined).is.undefined();
    expect(1).is.truthy();
    expect(0).is.falsey();
    expect(1).is.in({ 1: 1 });

    // expect().is.a
    expect(1).is.a(Number);
    expect(1).is.a('number');

    // expect().is.an
    expect([]).is.an(Array);
    expect(1).is.an.instance.of(Number);

    // expect().is.not
    expect(2).is.not(1);

    // expect().is.not.a
    expect(1).is.not.a(String);
    expect(1).is.not.a('string');

    // expect().is.not.an
    expect(1).is.not.an(Array);
    expect(1).is.not.an.instance.of(String);

    // expect().to.
    expect(1).to.equal(1);
    expect(() => { }).to.return();
    expect(() => 1).to.return(1);
    expect(() => 1).to.return.a(Number);
    expect(() => []).to.return.an(Array);
    expect(() => 1).to.return.an.instance.of(Number);
    expect(() => { throw 1; }).to.throw();
    expect(() => { throw 1; }).to.throw(1);
    expect(() => { throw 1; }).to.throw.a(Number);
    expect(() => { throw []; }).to.throw.an(Array);
    expect(() => { throw 1; }).to.throw.an.instance.of(Number);

    // expect().to.be
    expect(1).to.be(1);

    // expect().to.be.a
    expect(1).to.be.a(Number);

    // expect().to.be.an
    expect(1).to.be.an(Array);
    expect(1).to.be.an.instanceOf(Number);

    // expect().to.not
    expect(1).to.not.equal(1);
    expect(() => { throw 1; }).to.not.return();
    expect(() => 2).to.not.return(1);
    expect(() => 1).to.not.throw();
    expect(() => { throw 2; }).to.not.throw(1);

    // expect().to.not.be
    expect(1).to.not.be(1);

    // expect().to.not.be.a
    expect(1).to.not.be.a(Number);

    // expect().to.not.be.an
    expect(1).to.not.be.an(Array);
    expect(1).to.not.be.an.instanceOf(Number);

    // expect().will
    expect(Promise.resolve()).will.resolve();
    expect(Promise.resolve(1)).will.resolve(1);
    expect(Promise.reject()).will.reject();
    expect(Promise.reject(1)).will.reject(1);

    // expect().will.not
    expect(Promise.reject()).will.not.resolve();
    expect(Promise.reject(1)).will.not.resolve(1);
    expect(Promise.resolve()).will.not.reject();
    expect(Promise.resolve(1)).will.not.reject(1);

    // expect().not

    // expect().not.to
    expect(() => { throw 1; }).not.to.return();
    expect(() => 2).not.to.return(1);
    expect(() => 1).not.to.throw();
    expect(() => { throw 2; }).not.to.throw(1);

    // expect().and

    test('equals', () => {
        expect(1).equals(1);
    });

    test('throws', () => {
        expect(() => { throw 1; }).throws(1);
    });
})
