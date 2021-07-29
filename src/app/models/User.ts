import { PatientHistory } from './PatientHistory';
export interface User {
  id?: string;
  mail: string;
  password: string;
  address: string;
  name: string;
  surname: string;
  first_image: string;
  second_image: string;
  age: number;
  type: string;
  especializaciones?: string[];
  doc: string;
  obraSocial?: string;
  qualification?:any;
  history?:PatientHistory[];

}

export interface UserNav {
  uid: number;
  photoURL: string;
  email: string;
}

