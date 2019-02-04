import { Controller} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly _appService: AppService) {

  }
}

export interface Estudiante {
    estudianteId?: number;
    nombres: string;
    apellidos: string;
    fechaNacimiento: string;
    semestreActual: number;
}

export interface Materia {
    nombreM?: number;
    codigo: string;
    descripcion: string;
    activo: boolean;
    fechaCreacion: string;
    numeroHorasPorSemana: number;
}

export interface Evento {
    eventoId?: number;
    nombreE: number;
    fecha: string;
    latitud: number;
    longitud: number;
}

export interface EventoMateria{
    id: number;
}