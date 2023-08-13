"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
// function ClassDecorator(id:number){
//     return function(target:Function){
//         target.prototype.id = id;
//     }
// }
// function Logger(){
//     return function(target:Function){
//         // console.log('run',target.prototype.)
//     }
// }
// function Method(target:Object,propertyKey:string,propertyDesc:PropertyDescriptor){
//     // console.log(target)
//     // console.log(propertyKey)
//     // console.log(propertyDesc)
//     propertyDesc.value = function(arg1:number){
//         return arg1*10;
//     }
// }
// function Prop(target:Object,propertyKey:string){
//     let value:number;
//     const setter = (newValue:number) =>{
//         value = newValue;
//     }
//     const getter = ()=>value;
//     Object.defineProperty(target,propertyKey,{
//         // get:getter,
//         // set:setter,
//         configurable:false,
//         enumerable:false,
//         writable:false
//     })
// }
// @ClassDecorator(1)
// // @Logger()
// export class User {
//     @Prop id?:number
//     @Method
//     updateId(newId:number){
//         this.id = newId;
//         // return newId;
//     }
// }
// let user = new User()
// user.updateId(3)
// user.id = 20;
// delete user.id;
// console.log(user.id)
//test property decorator
function Min(limit) {
    return function (target, propertyKey) {
        let value;
        const getter = function () {
            return value;
        };
        const setter = function (newVal) {
            if (newVal.length < limit) {
                Object.defineProperty(target, 'errors', {
                    value: `Your password should be bigger than ${limit}`
                });
                Reflect.defineMetadata('validatePassword', limit, target, propertyKey);
            }
            else {
                value = newVal;
            }
        };
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter
        });
    };
}
function isEmail(target, propertyKey) {
    let value;
    // const getter = ()=>value;
    const setter = (newvalue) => {
        //check is email
        if (!newvalue.includes('.')) {
            Reflect.defineMetadata('validateEmail', newvalue, target, propertyKey);
            return false;
        }
        else {
            value = newvalue;
        }
    };
    Object.defineProperty(target, propertyKey, {
        set: setter,
        // get:getter
    });
}
function MethodChangePassword(newPasswd) {
    return function (target, propertyKey, propertyDesc) {
        console.log('start');
        let oldValue = propertyDesc.value;
        propertyDesc.value = function (newValue) {
            //pered tem kak cto-to sdelat
            newValue = "_" + newValue;
            oldValue.call(this, newValue);
            // return newValue;
        };
        return propertyDesc;
    };
}
class User {
    constructor(password, email, name) {
        this.name = name;
        this._password = password;
        this._email = email;
    }
    get password() {
        return this._password;
    }
    get email() {
        return this._email;
    }
    setPassword(newPasswd) {
        this._password = newPasswd;
    }
}
__decorate([
    Min(8),
    __metadata("design:type", String)
], User.prototype, "_password", void 0);
__decorate([
    isEmail,
    __metadata("design:type", String)
], User.prototype, "_email", void 0);
__decorate([
    MethodChangePassword('ramin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], User.prototype, "setPassword", null);
const user = new User("rami1n121212", 'ramin.web.97', "ramin");
console.log(user.password);
user.setPassword('rasdasdasdsadsd');
console.log(user.password);
// let errors = Reflect.getMetadata("validatePassword",user,"_password");
// console.log('errr',errors);
