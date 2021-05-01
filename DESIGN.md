
# expect(subject)

    expect(subject).equals(expected);

    expect(subject).equals(expected, strict);

## expect(subject).returns

    expect(subject).returns();

    expect(subject).returns(expected);

    expect(subject).returns(expected, strict);

    expect(subject).returns.a(expected);

    expect(subject).returns.a.string();

    expect(subject).returns.a.number();

    expect(subject).returns.a.bigint();

    expect(subject).returns.a.boolean();

    expect(subject).returns.a.symbol();

    expect(subject).returns.a.function();

    expect(subject).returns.an(expected);

    expect(subject).returns.an.object();

## expect(subject).throws

    expect(subject).throws();

    expect(subject).throws(expected);

    expect(subject).throws(expected, strict);

    expect(subject).throws.a(expected);

    expect(subject).throws.a.string();

    expect(subject).throws.a.number();

    expect(subject).throws.a.bigint();

    expect(subject).throws.a.boolean();

    expect(subject).throws.a.symbol();

    expect(subject).throws.a.function();

    expect(subject).throws.an(expected);

    expect(subject).throws.an.object();

## expect(subject).resolves

    expect(subject).resolves();

    expect(subject).resolves.with(expected);

    expect(subject).resolves.with(expected, strict);

    expect(subject).resolves.with.a(expected);

    expect(subject).resolves.with.a.string();

    expect(subject).resolves.with.a.number();

    expect(subject).resolves.with.a.bigint();

    expect(subject).resolves.with.a.boolean();

    expect(subject).resolves.with.a.symbol();

    expect(subject).resolves.with.a.function();

    expect(subject).resolves.with.an(expected);

    expect(subject).resolves.with.an.object();

## expect(subject).rejects

    expect(subject).rejects();

    expect(subject).rejects.with(expected);

    expect(subject).rejects.with(expected, strict);

    expect(subject).rejects.with.a(expected);

    expect(subject).rejects.with.a.string();

    expect(subject).rejects.with.a.number();

    expect(subject).rejects.with.a.bigint();

    expect(subject).rejects.with.a.boolean();

    expect(subject).rejects.with.a.symbol();

    expect(subject).rejects.with.a.function();

    expect(subject).rejects.with.an(expected);

    expect(subject).rejects.with.an.object();

## expect(subject).is

    expect(subject).is(expected);

    expect(subject).is(expected, strict);

    expect(subject).is.defined();

    expect(subject).is.null();

    expect(subject).is.undefined();

    expect(subject).is.truthy();

    expect(subject).is.falsey();

    expect(subject).is.in(expected);

    expect(subject).is.a(expected);

    expect(subject).is.a.string();

    expect(subject).is.a.number();

    expect(subject).is.a.bigint();

    expect(subject).is.a.boolean();

    expect(subject).is.a.symbol();

    expect(subject).is.a.function();

    expect(subject).is.an(expected);

    expect(subject).is.an.object();

### expect(subject).is.not

    expect(subject).is.not(expected);

    expect(subject).is.not(expected, strict);

    expect(subject).is.not.a(expected);

    expect(subject).is.not.a.string();

    expect(subject).is.not.a.number();

    expect(subject).is.not.a.bigint();

    expect(subject).is.not.a.boolean();

    expect(subject).is.not.a.symbol();

    expect(subject).is.not.a.function();

    expect(subject).is.not.an(expected);

    expect(subject).is.not.an.object();

## expect(subject).to

    expect(subject).to.equal(expected);

    expect(subject).to.equal(expected, strict);

### expect(subject).to.be

    expect(subject).to.be(expected);

    expect(subject).to.be(expected, strict);

    expect(subject).to.be.a(expected);

    expect(subject).to.be.a.string();

    expect(subject).to.be.a.number();

    expect(subject).to.be.a.bigint();

    expect(subject).to.be.a.boolean();

    expect(subject).to.be.a.symbol();

    expect(subject).to.be.a.function();

    expect(subject).to.be.an(expected);

    expect(subject).to.be.an.object();

### expect(subject).return

    expect(subject).to.return(expected);

    expect(subject).to.return(expected, strict);

    expect(subject).to.return.a(expected);

    expect(subject).to.return.a.string();

    expect(subject).to.return.a.number();

    expect(subject).to.return.a.bigint();

    expect(subject).to.return.a.boolean();

    expect(subject).to.return.a.symbol();

    expect(subject).to.return.a.function();

    expect(subject).to.return.an(expected);

    expect(subject).to.return.an.object();

### expect(subject).throw

    expect(subject).to.throw();

    expect(subject).to.throw(expected);

    expect(subject).to.throw(expected, strict);

    expect(subject).to.throw.a(expected);

    expect(subject).to.throw.a.string();

    expect(subject).to.throw.a.number();

    expect(subject).to.throw.a.bigint();

    expect(subject).to.throw.a.boolean();

    expect(subject).to.throw.a.symbol();

    expect(subject).to.throw.a.function();

    expect(subject).to.throw.an(expected);

    expect(subject).to.throw.an.object();

### expect(subject).to.not

    expect(subject).to.not.equal(expected);

    expect(subject).to.not.equal(expected, strict);

#### expect(subject).to.not.be

    expect(subject).to.not.be(expected);

    expect(subject).to.not.be(expected, strict);

    expect(subject).to.not.be.a(expected);

    expect(subject).to.not.be.a.string();

    expect(subject).to.not.be.a.number();

    expect(subject).to.not.be.a.bigint();

    expect(subject).to.not.be.a.boolean();

    expect(subject).to.not.be.a.symbol();

    expect(subject).to.not.be.a.function();

    expect(subject).to.not.be.an(expected);

    expect(subject).to.not.be.an.object();

#### expect(subject).to.not.return

    expect(subject).to.not.return(expected);

    expect(subject).to.not.return(expected, strict);

    expect(subject).to.not.return.a(expected);

    expect(subject).to.not.return.a.string();

    expect(subject).to.not.return.a.number();

    expect(subject).to.not.return.a.bigint();

    expect(subject).to.not.return.a.boolean();

    expect(subject).to.not.return.a.symbol();

    expect(subject).to.not.return.a.function();

    expect(subject).to.not.return.an(expected);

    expect(subject).to.not.return.an.object();

#### expect(subject).to.not.throw

    expect(subject).to.not.throw();

    expect(subject).to.not.throw(expected);

    expect(subject).to.not.throw(expected, strict);

    expect(subject).to.not.throw.a(expected);

    expect(subject).to.not.throw.a.string();

    expect(subject).to.not.throw.a.number();

    expect(subject).to.not.throw.a.bigint();

    expect(subject).to.not.throw.a.boolean();

    expect(subject).to.not.throw.a.symbol();

    expect(subject).to.not.throw.a.function();

    expect(subject).to.not.throw.an(expected);

    expect(subject).to.not.throw.an.object();

## expect(subject).will

### expect(subject).will.resolve

    expect(subject).will.resolve();

    expect(subject).will.resolve.with(expected);

    expect(subject).will.resolve.with(expected, strict);

    expect(subject).will.resolve.with.a(expected);

    expect(subject).will.resolve.with.a.string();

    expect(subject).will.resolve.with.a.number();

    expect(subject).will.resolve.with.a.bigint();

    expect(subject).will.resolve.with.a.boolean();

    expect(subject).will.resolve.with.a.symbol();

    expect(subject).will.resolve.with.a.function();

    expect(subject).will.resolve.with.an(expected);

    expect(subject).will.resolve.with.an.object();

### expect(subject).will.reject

    expect(subject).will.reject();

    expect(subject).will.reject.with(expected);

    expect(subject).will.reject.with(expected, strict);

    expect(subject).will.reject.with.a(expected);

    expect(subject).will.reject.with.a.string();

    expect(subject).will.reject.with.a.number();

    expect(subject).will.reject.with.a.bigint();

    expect(subject).will.reject.with.a.boolean();

    expect(subject).will.reject.with.a.symbol();

    expect(subject).will.reject.with.a.function();

    expect(subject).will.reject.with.an(expected);

    expect(subject).will.reject.with.an.object();

### expect(subject).will.not

#### expect(subject).will.not.resolve

    expect(subject).will.not.resolve();

    expect(subject).will.not.resolve.with(expected);

    expect(subject).will.not.resolve.with(expected, strict);

    expect(subject).will.not.resolve.with.a(expected);

    expect(subject).will.not.resolve.with.a.string();

    expect(subject).will.not.resolve.with.a.number();

    expect(subject).will.not.resolve.with.a.bigint();

    expect(subject).will.not.resolve.with.a.boolean();

    expect(subject).will.not.resolve.with.a.symbol();

    expect(subject).will.not.resolve.with.a.function();

    expect(subject).will.not.resolve.with.an(expected);

    expect(subject).will.not.resolve.with.an.object();

#### expect(subject).will.not.reject

    expect(subject).will.not.reject();

    expect(subject).will.not.reject.with(expected);

    expect(subject).will.not.reject.with(expected, strict);

    expect(subject).will.not.reject.with.a(expected);

    expect(subject).will.not.reject.with.a.string();

    expect(subject).will.not.reject.with.a.number();

    expect(subject).will.not.reject.with.a.bigint();

    expect(subject).will.not.reject.with.a.boolean();

    expect(subject).will.not.reject.with.a.symbol();

    expect(subject).will.not.reject.with.a.function();

    expect(subject).will.not.reject.with.an(expected);

    expect(subject).will.not.reject.with.an.object();
