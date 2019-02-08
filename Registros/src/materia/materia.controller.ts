import { BadRequestException, Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import {Materia} from '../app.controller';
import { MateriaEntity} from './materia.entity';
import {MateriaService} from './materia.service';
import {FindManyOptions, Like} from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { CreateMateriaDto } from './dto/create-materia.dto';

@Controller('materia')
export class MateriaController {
  constructor(
    private readonly _materiaService: MateriaService
  ){}

  @Get('materias')
  async materias(
    @Res() response,
    @Query('busqueda') busqueda: string,
    @Query('accion') accion: string,
    @Query('materia') materia: string,
  ){
    let mensaje = undefined;
    let clase = undefined;

    if (accion && materia) {
      switch (accion) {
        case 'borrar':
          mensaje = `Registro ${materia} eliminado`;
          clase = 'alert alert-danger';
          break;
        case 'actualizar':
          mensaje = `Registro ${materia} actualizado`;
          clase = 'alert alert-info';
          break;
        case 'crear':
          mensaje = `Registro ${materia} creado`;
          clase = 'alert alert-success';
          break;
      }
    }

    let materias: MateriaEntity[];
    if (busqueda) {
      const consulta: FindManyOptions<MateriaEntity> = {
        where: [
          {
            nombreMateria: Like(`%${busqueda}`)
          },
          {
            codigo: Like(`%${busqueda}`)
          }
        ]
      };
      materias = await this._materiaService.buscarMateria(consulta);
    } else {
      materias = await this._materiaService.buscarMateria();
    }
    response.render(
      'materias',
      {
        arregloMaterias: materias,
        booleano: false,
        mensaje: mensaje,
        clase: clase
      }
    );
  }

  @Post('eliminar/:materiaId')
  async eliminar(
    @Res() response,
    @Param('materiaId') materiaId: string
  ) {
    const materia = await this._materiaService.buscarPorIdMateria(+materiaId);
    await this._materiaService.eliminarMateria(Number(materiaId));
    const parametrosConsulta = `?accion=borrar%materia=${materia.nombreMateria}`;

    response.redirect('/materia/materias' + parametrosConsulta);
  }

  @Get('crear-materia')
  crearMateriaRuta(
    @Res() response
  ) {
    response.render(
      'crear-materia'
    )
  }

  @Post('crear-materia')
  async crearMateriaFuncion(
    @Res() response,
    @Body() materia: Materia
  ) {
    const objetoValidacionMateria = new CreateMateriaDto();
    objetoValidacionMateria.nombreMateria = materia.nombreMateria;
    objetoValidacionMateria.codigo = materia.codigo;
    objetoValidacionMateria.descripcion = materia.descripcion;

    const errores: ValidationError[] = await validate(objetoValidacionMateria);

    const hayErrores = errores.length > 0;

    if (hayErrores) {
      console.error(errores);
      throw new BadRequestException({mensaje: 'Error de validacion'})
    } else {
      const respuesta = await this._materiaService.crearMateria(materia);
      const parametrosConsulta = `?accion=crear%materia${materia.nombreMateria}`;

      response.redirect(
        '/materia/materias' + parametrosConsulta
      );
    }
  }

  @Get('actualizar-materia/:materiaId')
  async actualizarMateriaVista(
    @Res() response,
    @Param('materiaId') materiaId: string,
  ) {
    const materiaEncontrada = await this._materiaService
      .buscarPorIdMateria(+materiaId);

    response.render(
      'crear-materia',
      {
        materia: materiaEncontrada
      }
    );
  }

  @Post('actualizar-materia/:materiaId')
  async actulizarMateriaMetodo(
    @Res() response,
    @Param('materiaId') materiaId: string,
    @Body() materia: Materia
  ) {
    materia.materiaId = +materiaId;
    await this._materiaService.actualizarMateria(materia);

    const parametrosConsulta = `?accion=actualizar&materia=${materia.nombreMateria}`;

    response.redirect(
      '/materia/materias' +parametrosConsulta
    );
  }

  @Get('listar')
  async getRoles(
  ) {
    return await this._materiaService.buscarMateria();
  }

}
