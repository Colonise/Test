export abstract class TestReporterEvent<TType = unknown> {
    public readonly type: TType;

    public constructor(type: TType) {
        this.type = type;
    }
}
