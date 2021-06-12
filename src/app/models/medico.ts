import { Dias } from '../utils/dias.enum';
import { IUser } from './user';

export interface IMedico extends IUser{
    type:string,
    especialidades:string[],
    dias_laborables:string[],
    validado:boolean,
    uid:string
}