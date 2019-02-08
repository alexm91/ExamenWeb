import { BadRequestException, Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { Evento } from '../app.controller';
import {EventoEntity} from './evento.entity';
import {EventoService} from './evento.service';
import {FindManyOptions, Like} from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import {CreateEventoDto} from './dto/create-evento.dto';

@Controller('evento')
export class EventoController {
  constructor(
    private readonly _eventoService: EventoService
  ){}

  @Get('eventos')
  async eventos(
    @Res() response,
    @Query('busqueda') busqueda: string,
    @Query('accion') accion: string,
    @Query('evento') evento: string,
  ) {
    let mensaje = undefined;
    let clase = undefined;

    if (accion && evento) {
      switch (accion) {
        case 'borrar':
          mensaje = `Registro ${evento} eliminado`;
          clase = 'alert alert-danger';
          break;
        case 'actualizar':
          mensaje = `Registro ${evento} actualizado`;
          clase = 'alert alert-info';
          break;
        case 'crear':
          mensaje = `Registro ${evento} creado`;
          clase = 'alert alert-success';
          break;
      }
    }

    let eventos: EventoEntity[];
    if (busqueda) {
      const consulta: FindManyOptions<EventoEntity> = {
        where: [
          {
            nombreE: Like(`%${busqueda}`)
          }
        ]
      };
      eventos = await this._eventoService.buscarEvento(consulta);
    } else {
      eventos = await this._eventoService.buscarEvento();
    }
    response.render(
      'eventos',
      {
        arregloEventos: eventos,
        booleano: false,
        mensaje: mensaje,
        clase: clase
      }
    );
  }

  @Post('eliminar/:eventoId')
  async eliminar(
    @Res() response,
    @Param('eventoId') eventoId: string,
  ) {
    const evento = await this._eventoService.buscarPorIdEvento(+eventoId);
    await this._eventoService.eliminarEvento(Number(eventoId));
    const parametrosConsulta = `?accion=borrar%evento=${
      evento.nombreEvento
      }`;
    response.redirect('/evento/eventos' + parametrosConsulta)
  }

  @Get('crear-evento')
  crearEventoRuta(
    @Res() response
  ) {
    response.render(
      'crear-evento'
    )
  }

  @Post('crear-evento')
  async crearEventoFuncion(
    @Res() response,
    @Body() evento: Evento
  ) {
    const objetoValidacion = new CreateEventoDto();
    objetoValidacion.nombreEvento = evento.nombreEvento;

    const errores: ValidationError[] = await validate(
      objetoValidacion);

    const hayErrores = errores.length > 0;

    if (hayErrores) {
      console.error(errores);
      throw new BadRequestException({mensaje: 'Error de validacion'})
    } else {
      const respuesta = await this._eventoService.crearEvento(evento);
      const parametrosConsulta = `?accion=crear&evento=${evento.nombreEvento}`;

      response.redirect(
        '/evento/eventos' + parametrosConsulta
      );
    }
  }

  @Get('actualizar-evento/:eventoId')
  async actualizarEventoVista(
    @Res() response,
    @Param('eventoId') eventoId: string,
  ) {
    const eventoEncontrado = await this._eventoService
      .buscarPorIdEvento(+eventoId);

    response.render(
      'crear-evento',
      {
        evento: eventoEncontrado
      }
    )
  }

  @Post('actualizar-evento/:eventoId')
  async actualizarEventoMetodo(
    @Res() response,
    @Param('eventoId') eventoId: string,
    @Body() evento: Evento
  ) {
    evento.eventoId = +eventoId;
    await this._eventoService.actualizarEvento(evento);

    const parametrosConsulta = `?accion=actualizar&evento=${evento.nombreEvento}`

    response.redirect(
      '/evento/eventos' + parametrosConsulta
    );
  }

  @Get('ver/:idEvento')
  async verEvento(
    @Param('idEvento')idEvento: string,
    @Res() response,
  ) {
    const eventoEncontrado = await this._eventoService
      .buscarPorIdEvento(+idEvento);
    response.render(
      'evento_ver',
      {
        titulo:"Ver evento",
        evento:eventoEncontrado,
      })
  }
}