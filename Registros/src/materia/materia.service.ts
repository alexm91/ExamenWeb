import {Injectable} from "@nestjs/common";
import { Materia } from '../app.controller';
import {MateriaEntity} from './materia.entity';
import {FindManyOptions, Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class MateriaService {

  constructor(
    @InjectRepository(MateriaEntity)
    private readonly _materiaRepository: Repository<MateriaEntity>,
  ){}

  buscarMateria(parametrosBusqueda?: FindManyOptions<MateriaEntity>)
    : Promise<MateriaEntity[]>{
    return this._materiaRepository.find(parametrosBusqueda);
  }

  crearMateria(materia: Materia) : Promise<MateriaEntity>{
    const materiaEntity : MateriaEntity = this._materiaRepository.create(materia);
    return this._materiaRepository.save(materiaEntity);
  }

  eliminarMateria(materiaId: number) : Promise<MateriaEntity> {
    const materiaEliminar : MateriaEntity = this._materiaRepository
      .create({
        materiaId: materiaId
      });
    return this._materiaRepository.remove(materiaEliminar);
  }

  actualizarMateria(nuevaMateria: Materia) : Promise<MateriaEntity> {
    const materiaEntity: MateriaEntity = this._materiaRepository
      .create(nuevaMateria);
    return this._materiaRepository.save(materiaEntity);
  }

  buscarPorIdMateria(materiaId: number) : Promise<MateriaEntity> {
    return this._materiaRepository.findOne(materiaId)
  }

}