import { User } from './User';
import { MedicalSpecialty } from './MedicalSpecialty';
import { ShiftStates } from '../utils/shiftStates.enum';

export interface Shift {
  id?: string;
  paciente: User;
  medico: User;
  fecha: string;
  hora: string;
  resena?: string;
  encuesta?: any[];
  motivoRechazo?: string;
  calificacion?: any;
  estado: ShiftStates;
  especialidad: MedicalSpecialty;
}
