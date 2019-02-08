import { Column, JoinTable, Entity, Index, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';
import { MateriaEntity } from '../materia/materia.entity';

@Entity('evento')
export class EventoEntity {

  @PrimaryGeneratedColumn()
  eventoId: number;

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

  @ManyToMany(type => MateriaEntity)
  @JoinTable({
    name: "evento_materias",
    joinColumn: {
      name: "evento",
      referencedColumnName: "eventoId"
    },
    inverseJoinColumn: {
      name: "materia",
      referencedColumnName: "materiaId"
    }
  })
  materias:MateriaEntity[];

}