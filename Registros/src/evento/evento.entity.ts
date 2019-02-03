import { Column, Entity, Index, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { EventoMateriaEntity } from '../Evento-Materia/evento-materia.entity';

@Entity('evento')
export class EventoEntity {

  @PrimaryGeneratedColumn()
  eventoId: number;

  @Index()
  @Column({
    name: 'Evento',
    type: 'int',
  })
  nombreE: number;

  @Column({
    name: 'Fecha',
    type: 'date',
  })
  fecha: string;

  @Column({
    name: 'Latitud',
    type: 'decimal',
    precision: 9,
    scale: 2,
  })
  latitud: number;

  @Column({
    name: 'Longitud',
    type: 'decimal',
    precision: 9,
    scale: 2,
  })
  longitud: number;

  @OneToMany(
    type => EventoMateriaEntity,
    eventoMateriaE => eventoMateriaE.evento,
  )
  eventos: EventoMateriaEntity[];

}