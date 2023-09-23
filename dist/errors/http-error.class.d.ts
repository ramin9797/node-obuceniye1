export declare class HttpError extends Error {
    statusCode: number;
    message: string;
    context?: string | undefined;
    constructor(statusCode: number, message: string, context?: string | undefined);
}
