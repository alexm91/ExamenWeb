import { Controller, Get, HttpCode, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { EstudianteEntity } from './estudiante/estudiante.entity';

@Controller()
export class AppController {
  constructor(private readonly _appService: AppService) {

  }

  @Get('inicio')
  @HttpCode(200)
  async ejecutar(
    @Res() response,
  ){
      response.render(
        'inicio'
      );
  }

}

export interface Estudiante {
    estudianteId?: number;
    nombres: string;
    apellidos: string;
    fechaNacimiento: string;
    semestreActual: number;
    graduado: boolean;
}

export interface Materia {
    materiaId?: number
    nombreMateria: string;
    codigo: string;
    descripcion: string;
    activo: boolean;
    fechaCreacion: string;
    numeroHorasPorSemana: number;
    estudianteIdFK: EstudianteEntity;
}

export interface Evento {
    eventoId?: number;
    nombreEvento: number;
    fechaEvento: string;
    latitud: number;
    longitud: number;
}

export interface EventoMateria{
    id: number;
    eventoIdFK?: number;
    materiaIdFK?: number;
}