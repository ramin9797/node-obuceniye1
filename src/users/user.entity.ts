import {hash} from "bcryptjs"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name:"email"})
    private readonly _email:string;

    @Column({name:"password"})
    private _password:string;

    @Column({name:"name"})
    private _name:string;


    constructor(email:string, name:string,password:string){
        this._email = email;
        this._name = name;
        this._password = password;
    }

    get email():string{
        return this._email
    }

    get name():string{
        return this._name
    }

    get password():string{
        return this._password;
    }

    public async setPassword(passwd:string,salt:number):Promise<void>{
        this._password = await hash(passwd,salt);
    }
}