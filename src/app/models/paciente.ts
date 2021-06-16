import { IUser } from './user';

export interface IPaciente extends IUser {
  type: string;
  uid: string;
  historial: any[];
}

