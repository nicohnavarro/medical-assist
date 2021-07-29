import { User } from './User';
export interface PatientHistory {
  id?:string;
  height:number;
  weight:number;
  pressure:string;
  temperature:string;
  date: Date;
  specialty: string;
}