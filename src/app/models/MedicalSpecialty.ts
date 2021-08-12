export interface MedicalSpecialty {
  name:string;
  id?:string;
  shifts?:number;
  doctors?:number;
  patients?:string[],
  image?:string;
}