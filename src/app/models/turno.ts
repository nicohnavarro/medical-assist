import { MedicalSpecialty } from './medical_specialty';
import { Especialidades } from '../utils/especialidades.enum';
import { EstadosTurno } from '../utils/estados-turno.enum';
import { IMedico } from './medico';
import { IPaciente } from './paciente';

export interface ITurno {
  id?: string;
  paciente: IPaciente;
  medico: IMedico;
  fecha: string;
  hora: string;
  resena?: string;
  encuesta?: any[];
  motivoRechazo?: string;
  calificacion?: any;
  estado: EstadosTurno;
  especialidad: MedicalSpecialty;
}
