export interface LoggerObject {
    trace: (...args: any[]) => any;
    debug: (...args: any[]) => any;
    success: (...args: any[]) => any;
    info: (...args: any[]) => any;
    warn: (...args: any[]) => any;
    error: (...args: any[]) => any;
    fatal: (...args: any[]) => any;
}
export declare const disabledLogger: LoggerObject;
