export declare class User {
    private readonly _email;
    private readonly _name;
    private _password;
    constructor(_email: string, _name: string);
    get email(): string;
    get name(): string;
    get password(): string;
    setPassword(passwd: string, salt: number): Promise<void>;
}
