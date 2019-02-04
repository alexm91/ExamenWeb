import {Injectable} from '@nestjs/common';
import {EventoMateriaEntity} from './evento-materia.entity';
import {FindManyOptions, Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class EventoMateriaService {

  constructor(
    @InjectRepository(EventoMateriaEntity)
    private readonly _eventomateriaRepository: Repository<EventoMateriaEntity>
  ){}

  buscar(parametrosBusqueda?: FindManyOptions<EventoMateriaEntity>)
    : Promise<EventoMateriaEntity[]> {
    return this._eventomateriaRepository.find(parametrosBusqueda);
  }

  buscarPorId(eventoMateriaId: number) : Promise<EventoMateriaEntity> {
    return this._eventomateriaRepository.findOne(eventoMateriaId);
  }

}