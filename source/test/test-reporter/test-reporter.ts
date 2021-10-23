import type { TestReporterEvent } from './events';

export abstract class TestReporter {
    public static current: TestReporter | undefined = undefined;

    public static emit(event: TestReporterEvent): void {
        if (TestReporter.current) {
            TestReporter.current.onEvent(event);
        }
    }

    public abstract onEvent(event: TestReporterEvent): void;
}
