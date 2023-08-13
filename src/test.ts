import "reflect-metadata";
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

function Min(limit: number) {
    return function(target: Object, propertyKey: string) { 
      let value : string;
      const getter = function() {
        return value;
      };
      const setter = function(newVal: string) {
         if(newVal.length < limit) {
          Object.defineProperty(target, 'errors', {
            value: `Your password should be bigger than ${limit}`
          });
          Reflect.defineMetadata('validatePassword',limit,target,propertyKey)
        }
        else {
          value = newVal;   
        }      
      }; 
      Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter
      }); 
    }
  }


  function isEmail(target:Object,propertyKey:string){
    let value:string;
    // const getter = ()=>value;
    const setter=(newvalue:string)=>{
        //check is email
        if(!newvalue.includes('.')){
            Reflect.defineMetadata('validateEmail',newvalue,target,propertyKey);
            return false;
        }
        else{
            value = newvalue;
        }
    }

    Object.defineProperty(target,propertyKey,{
        set:setter,
        // get:getter
    })
  }



  function MethodChangePassword(newPasswd:string){
    return function(target:Object,propertyKey:string,propertyDesc:PropertyDescriptor){
        console.log('start')
        let oldValue =  propertyDesc.value;
        propertyDesc.value = function(newValue:string){
            //pered tem kak cto-to sdelat
            newValue="_"+newValue;
            oldValue.call(this,newValue);
            // return newValue;
        }
        return propertyDesc;

    }

  }

class User {
    @Min(8)
    private _password:string;


    @isEmail
    private _email:string;

    constructor(password:string,email:string,public name:string){
        this._password = password;
        this._email = email;
    }

    get password() {
        return this._password;
    }

    get email() {
        return this._email;
    }

    @MethodChangePassword('ramin')
    setPassword(newPasswd:string):void{
        this._password = newPasswd
    }
}

const user = new User("rami1n121212",'ramin.web.97',"ramin");
console.log(user.password)
user.setPassword('rasdasdasdsadsd')
console.log(user.password)

// let errors = Reflect.getMetadata("validatePassword",user,"_password");
// console.log('errr',errors);