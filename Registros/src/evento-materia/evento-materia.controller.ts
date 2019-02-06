import { BadRequestException, Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import {EventoMateria} from '../app.controller';
import {EventoMateriaService} from './evento-materia.service';
import {EventoMateriaEntity} from './evento-materia.entity';
import {FindManyOptions, Like} from 'typeorm';
import { validate, ValidationError } from 'class-validator';

@Controller('evento-materia')
export class EventoMateriaController {
  constructor (
    private readonly _eventomateriaService: EventoMateriaService
  ){}

  @Get('eventos-materias')
  async eventosMateria(
    @Res() response,
    @Query('busqueda') busqueda: string,
    @Query('accion') accion: string,
    @Query('eventoMateria') eventoMateria: string
  ) {
    let mensaje = undefined;
    let clase = undefined;

    if (accion && eventoMateria) {
      switch (accion) {
        case 'borrar':
          mensaje = `Registro ${eventoMateria} eliminado`;
          clase = 'alert alert-danger';
          break;
        case 'actualizar':
          mensaje = `Registro ${eventoMateria} actualizado`;
          clase = 'alert alert-info';
          break;
        case 'crear':
          mensaje = `Registro ${eventoMateria} creado`;
          clase = 'alert alert-success';
          break;
      }
    }

    let eventosMaterias: EventoMateriaEntity[];
    if (busqueda) {
      const consulta: FindManyOptions<EventoMateriaEntity> = {
        where: [
          {
            eventoIdFK: Like(`%${busqueda}`)
          },
          {
            materiaIdFK: Like(`%${busqueda}`)
          }
        ]
      };
      eventosMaterias = await this._eventomateriaService.buscar(consulta);
    }  else {
      eventosMaterias = await this._eventomateriaService.buscar();
    }
    response.render(
      'eventos-materias',
      {
        arregloEventosMaterias: eventosMaterias,
        booleano: false,
        mensaje: mensaje,
        clase: clase
      }
    );
  }
}