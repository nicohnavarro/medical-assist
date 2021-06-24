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
  record?:any;
  qualification?:any;

}

export interface UserNav {
  uid: number;
  photoURL: string;
  email: string;
}

