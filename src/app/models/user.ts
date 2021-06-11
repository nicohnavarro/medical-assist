export interface IUser {
    id?:string,
    mail:string,
    password:string,
    address:string,
    name:string,
    surname:string,
    first_image:string,
    second_image:string,
    age:number,
    type:string,
    especializaciones?:string[],
}

export interface UserNav {
    uid:number,
    photoURL:string,
    email:string
}