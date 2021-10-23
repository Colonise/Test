export class TestCaseResult {
    public readonly id: number;
    public readonly label: string;
    public readonly result: boolean;

    // eslint-disable-next-line id-length
    public constructor(id: number, label: string, result: boolean) {
        // eslint-disable-next-line id-length
        this.id = id;
        this.label = label;
        this.result = result;
    }
}
