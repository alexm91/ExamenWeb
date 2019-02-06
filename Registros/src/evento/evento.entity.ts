import { Column, Entity, Index, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { EventoMateriaEntity } from '../evento-materia/evento-materia.entity';

@Entity('evento')
export class EventoEntity {

  @PrimaryGeneratedColumn()
  eventoId: number;

  @Index()
  @Column({
    name: 'Evento',
    type: 'varchar',
  })
  nombreEvento: string;

  @Column({
    name: 'Fecha',
    type: 'date',
  })
  fechaEvento: string;

  @Column({
    name: 'Latitud',
    type: 'decimal',
    precision: 9,
    scale: 6,
  })
  latitud: number;

  @Column({
    name: 'Longitud',
    type: 'decimal',
    precision: 9,
    scale: 6,
  })
  longitud: number;

  @OneToMany(
    type => EventoMateriaEntity,
    eventoMateriaE => eventoMateriaE.evento,
  )
  eventos: EventoMateriaEntity[];

}