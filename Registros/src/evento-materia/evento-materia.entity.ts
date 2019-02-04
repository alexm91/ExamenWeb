import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { MateriaEntity } from '../materia/materia.entity';
import { EventoEntity } from '../evento/evento.entity';

@Entity('evento materia')
export class EventoMateriaEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    type => MateriaEntity,
    materia => materia.eventoMateria
  )
  eventoMateria: MateriaEntity[];

  @ManyToOne(
    type => EventoEntity,
    evento => evento.eventos
  )
  evento: EventoEntity[];

}