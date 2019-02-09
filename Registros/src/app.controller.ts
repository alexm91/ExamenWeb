import { Controller, Get, HttpCode, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { EstudianteEntity } from './estudiante/estudiante.entity';
import { MateriaEntity } from './materia/materia.entity';
import { EventoEntity } from './evento/evento.entity';
import { FindManyOptions, Like } from 'typeorm';
import { EventoService } from './evento/evento.service';
import { MateriaService } from './materia/materia.service';

@Controller()
export class AppController {
  constructor(private readonly _appService: AppService,
              private readonly  _eventoService: EventoService,
              private readonly _materiaService: MateriaService) {

  }

  @Get('inicio')
  @HttpCode(200)
  async ejecutar(
    @Res() response,
    @Query('busqueda') busqueda: string,
  ){
    let eventos: EventoEntity[];
    let materias: MateriaEntity[];
    try{
      if (busqueda) {
        const consulta: FindManyOptions<EventoEntity> = {
          where: [
            {
              nombreEvento: Like(`%${busqueda}`)
            }
          ]
        };
        eventos = await this._eventoService.buscarEvento(consulta);
      } else {
        eventos = await this._eventoService.buscarEvento();
        materias = await this._materiaService.buscarMateria();
      }
    } catch (e) {
      console.error('ERROR', e);
    }


      response.render(
        'inicio',
        {
          arregloEventos: eventos,
          arregloMaterias: materias
        }
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
    materias?: MateriaEntity[];
}

export interface Materia {
    materiaId?: number
    nombreMateria: string;
    codigo: string;
    descripcion: string;
    activo: boolean;
    fechaCreacion: string;
    numeroHorasPorSemana: number;
    estudiante: EstudianteEntity;
}

export interface Evento {
    eventoId?: number;
    nombreEvento: string;
    fechaEvento: string;
    latitud: number;
    longitud: number;
    materias: MateriaEntity[];
}