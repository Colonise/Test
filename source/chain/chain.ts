export abstract class Chain<TValue> {
    protected readonly value: TValue;

    public constructor(value: TValue) {
        this.value = value;
    }
}
