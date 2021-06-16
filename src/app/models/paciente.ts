import { IUser } from './user';

export interface IPaciente extends IUser {
  type: string;
  id: string;
  historial: any[];
}
