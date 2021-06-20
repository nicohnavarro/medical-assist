import { IUser } from './user';
import { MedicalSpecialty } from './medical_specialty';
import { Especialidades } from '../utils/especialidades.enum';
import { EstadosTurno } from '../utils/estados-turno.enum';

export interface ITurno {
  id?: string;
  paciente: IUser;
  medico: IUser;
  fecha: string;
  hora: string;
  resena?: string;
  encuesta?: any[];
  motivoRechazo?: string;
  calificacion?: any;
  estado: EstadosTurno;
  especialidad: MedicalSpecialty;
}
