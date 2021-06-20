import { IUser } from './user';
import { MedicalSpecialty } from './medical_specialty';
import { ShiftStates } from '../utils/shiftStates.enum';

export interface Shift {
  id?: string;
  paciente: IUser;
  medico: IUser;
  fecha: string;
  hora: string;
  resena?: string;
  encuesta?: any[];
  motivoRechazo?: string;
  calificacion?: any;
  estado: ShiftStates;
  especialidad: MedicalSpecialty;
}
