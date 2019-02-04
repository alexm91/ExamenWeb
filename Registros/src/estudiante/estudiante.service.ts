import { Injectable } from '@nestjs/common';
import {Estudiante} from '../app.controller';
import { EstudianteEntity} from './estudiante.entity';
import {FindManyOptions, Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class EstudianteService {

  constructor(
    @InjectRepository(EstudianteEntity)
    private readonly _estudianteRepository: Repository<EstudianteEntity>
  ){
  }

  buscar(parametrosBusqueda?: FindManyOptions<EstudianteEntity>)
    : Promise<EstudianteEntity[]>{
    return this._estudianteRepository.find(parametrosBusqueda);
  }

  crear(estudiante: Estudiante) : Promise<EstudianteEntity>{
    const estudianteEntity : EstudianteEntity = this._estudianteRepository
      .create(estudiante);
    return this._estudianteRepository.save(estudianteEntity);
  }

  eliminar(estudianteId: number): Promise<EstudianteEntity> {
    const estudianteEliminar : EstudianteEntity = this._estudianteRepository
      .create({
        estudianteId: estudianteId
      });
    return this._estudianteRepository.remove(estudianteEliminar);
  }

  actualizar(nuevoEstudiante: Estudiante) : Promise<EstudianteEntity> {
    const estudianteEntity : EstudianteEntity = this._estudianteRepository
      .create(nuevoEstudiante);
    return this._estudianteRepository.save(estudianteEntity);
  }

  buscarPorId(estudianteId: number): Promise<EstudianteEntity> {
    return this._estudianteRepository.findOne(estudianteId);
  }

}