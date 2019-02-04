import {Injectable} from "@nestjs/common";
import {Evento} from '../app.controller';
import {EventoEntity} from './evento.entity';
import {FindManyOptions, Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class EventoService {

  constructor(
    @InjectRepository(EventoEntity)
    private readonly _eventoRepository : Repository<EventoEntity>
  ){}

  buscarEvento(parametrosBusqueda?: FindManyOptions<EventoEntity>)
    : Promise<EventoEntity[]> {
    return this._eventoRepository.find(parametrosBusqueda);
  }

  crearEvento(evento: Evento) : Promise<EventoEntity> {
    const eventoEntity : EventoEntity = this._eventoRepository
      .create(evento);
    return this._eventoRepository.save(eventoEntity);
  }

  eliminarEvento(eventoId: number) : Promise<EventoEntity> {
    const eventoEliminar : EventoEntity = this._eventoRepository
      .create({
        eventoId: eventoId
      });
    return this._eventoRepository.remove(eventoEliminar)
  }

  actualizarEvento(nuevoEvento: Evento) : Promise<EventoEntity> {
    const eventoEntity: EventoEntity = this._eventoRepository
      .create(nuevoEvento);
    return this._eventoRepository.save(eventoEntity);
  }

  buscarPorIdEvento(eventoId: number) : Promise<EventoEntity> {
    return this._eventoRepository.findOne(eventoId);
  }

}