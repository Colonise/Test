import { toDisplayString } from '@colonise/utilities';

export class AssertionResult<TSubject, TActual, TExpected> {
    // eslint-disable-next-line max-params
    private static parseAssertionMessage(
        message: string,
        subject: unknown,
        actual: unknown,
        expected: unknown,
        result: boolean,
        reverse: boolean
    ): string {
        const stringifiedSubject = toDisplayString(subject);
        const stringifiedActual = toDisplayString(actual);
        const stringifiedExpected = toDisplayString(expected);

        return message
            .replace(/%subject%/gu, stringifiedSubject)
            .replace(/%actual%/gu, stringifiedActual)
            .replace(/%expected%/gu, stringifiedExpected)
            .replace(/%(?:success|succeed|succeeded)=(.+?)%/gu, value => {
                if (!result) {
                    return '';
                }

                return /%(?:success|succeed|succeeded)=(.+?)%/u.exec(value)?.[1] ?? '';
            })
            .replace(/%(?:fail|failed)=(.+?)%/gu, value => {
                if (result) {
                    return '';
                }

                return /%(?:fail|failed)=(.+?)%/u.exec(value)?.[1] ?? '';
            })
            .replace(/%reverse=(.+?)%/gu, value => {
                if (!reverse) {
                    return '';
                }

                return /%reverse=(.+?)%/u.exec(value)?.[1] ?? '';
            });
    }

    public readonly subject: TSubject;
    public readonly actual: TActual;
    public readonly expected: TExpected;
    public readonly reversed: boolean;
    public readonly result: boolean;
    public readonly message: string;

    // eslint-disable-next-line max-params
    public constructor(
        subject: TSubject,
        actual: TActual,
        expected: TExpected,
        reverse: boolean,
        result: boolean,
        message: string
    ) {
        this.subject = subject;
        this.actual = actual;
        this.expected = expected;
        this.reversed = reverse;
        this.result = reverse ? !result : Boolean(result);
        this.message = AssertionResult.parseAssertionMessage(String(message), subject, actual, expected, result, reverse);
    }
}
