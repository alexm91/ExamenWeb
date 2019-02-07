import { BadRequestException, Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import {Estudiante} from '../app.controller';
import {EstudianteEntity} from './estudiante.entity';
import {EstudianteService} from './estudiante.service';
import {FindManyOptions, Like} from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';

@Controller('estudiante')
export class EstudianteCotroller {
  constructor(
    private readonly _estudianteService: EstudianteService
  ){}

  @Get('estudiantes')
  async estudiantes(
    @Res() response,
    @Query('busqueda') busqueda: string,
    @Query('accion') accion: string,
    @Query('estudiante') estudiante: string,
  ) {
    let mensaje = undefined;
    let clase = undefined;

    if (accion && estudiante) {
      switch (accion) {
        case 'borrar':
          mensaje = `Registro ${estudiante} eliminado`;
          clase = 'alert alert-danger';
          break;
        case 'actualizar':
          mensaje = `Registro ${estudiante} actualizado`;
          clase = 'alert alert-info';
          break;
        case 'crear':
          mensaje = `Registro ${estudiante} creado`;
          clase = 'alert alert-success';
          break;
      }
    }

    let estudiantes: EstudianteEntity[];
    if (busqueda) {
      const consulta: FindManyOptions<EstudianteEntity> = {
        where: [
          {
            nombres: Like(`%${busqueda}`)
          },
          {
            apellidos: Like(`%${busqueda}`)
          },
        ]
      };
      estudiantes = await this._estudianteService.buscarEstudiante(consulta);
    } else {
      estudiantes = await this._estudianteService.buscarEstudiante();
    }
    response.render(
      'estudiantes',
      {
        arregloEstudiantes: estudiantes,
        booleano: false,
        mensaje: mensaje,
        clase: clase
      }
    );
  }

  @Post('eliminar/:estudianteId')
  async eliminar(
    @Res() response,
    @Param('estudianteId') estudianteId: string,
  ) {
    const estudiante = await this._estudianteService.buscarPorIdEstudiante(+estudianteId);
    await this._estudianteService.eliminarEstudiante(Number(estudianteId));
    const parametrosConsulta = `?accion=borrar%estudiante=${
      estudiante.nombres
    }`;
    response.redirect('/estudiante/estudiantes' + parametrosConsulta)
  }

  @Get('crear-estudiante')
  crearEstudianteRuta(
    @Res() response
  ){
    response.render(
      'crear-estudiante'
    )
  }

  @Post('crear-estudiante')
  async crearEstudianteFuncion(
    @Res() response,
    @Body() estudiante: Estudiante
  ) {
    const objetoValidacionEstudiante = new CreateEstudianteDto();

    objetoValidacionEstudiante.nombres = estudiante.nombres;
    objetoValidacionEstudiante.apellidos = estudiante.apellidos;
    objetoValidacionEstudiante.semestreActual = +estudiante.semestreActual;
    objetoValidacionEstudiante.fechaNacimiento = estudiante.fechaNacimiento;

    const errores: ValidationError[] = await validate(
      objetoValidacionEstudiante);

    const hayErrores = errores.length > 0;

    if (hayErrores) {
      console.error(errores);
      throw new BadRequestException({mensaje: 'Error de validacion'})
    } else {
      const respuesta = await this._estudianteService.crearEstudiante(estudiante);
      const parametrosConsulta = `?accion=crear%estudiante=${estudiante.nombres}`;

      response.redirect(
        '/estudiante/estudiantes' + parametrosConsulta
      );
    }

  }

  @Get('actualizar-estudiante/:estudianteId')
  async actualizarEstudianteVista(
    @Res() response,
    @Param('estudianteId') estudianteId: string,
  ) {
    const estudianteEncontrado = await this._estudianteService
      .buscarPorIdEstudiante(+estudianteId);

    response.render(
      'crear-estudiante',
      {
        estudiante: estudianteEncontrado
      }
    );
  }

  @Post('actualizar-estudiante/:estudianteId')
  async actualizarParticipanteMetodo(
    @Res() response,
    @Param('estudianteId') estudianteId: string,
    @Body() estudiante: Estudiante
  ) {
    estudiante.estudianteId = +estudianteId;
    await this._estudianteService.actualizarEstudiante(estudiante);

    const parametrosConsulta = `?accion=actualizar&estudiante=${estudiante.nombres}`

    response.redirect(
      '/estudiante/estudiantes' + parametrosConsulta
    );
  }
}