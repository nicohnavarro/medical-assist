export interface WorkDay{
  index:number,
  docId?:string,
  name:string,
  active:boolean,
  schedule?:WorkSchedule[],
  doctorId?:string,
}

export interface WorkSchedule{
  hour:string,
  active:boolean,
}