export declare class User {
    id: number;
    private readonly _email;
    private _password;
    private _name;
    constructor(email: string, name: string, password: string);
    get email(): string;
    get name(): string;
    get password(): string;
    setPassword(passwd: string, salt: number): Promise<void>;
}
