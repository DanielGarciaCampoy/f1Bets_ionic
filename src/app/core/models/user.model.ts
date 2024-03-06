export interface UserLogin{
    identifier:string,
    password:string
}

export interface UserRegister{
    email:string,
    password:string,
    userName:string,
}

export interface User{
    uid:string;
    userName:string;
    email:string;
    betMoney:number;
    picture:string;
    admin:boolean;
}