import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { EstudianteEntity} from '../estudiante/estudiante.entity';
import { EventoMateriaEntity } from '../evento-materia/evento-materia.entity';

@Entity('materia')
export class MateriaEntity {

  @PrimaryGeneratedColumn()
  nombreM: number;

  @Column({
    name: 'Codigo',
    type: 'varchar',
    length: 6
  })
  codigo: string;

  @Column({
    name: 'Descripcion',
    type: 'varchar',
    length: 50
  })
  descripcion: string;

  @Column({
    name: 'Activo',
    type: 'tinyint'
  })
  activo: boolean;

  @Column({
    name: 'Fecha de Creacion',
    type: 'date'
  })
  fechaCreacion: string;

  @Column({
    name: 'Numero de Horas por Semana',
    type: 'int'
  })
  numeroHorasPorSemana: number;

  @ManyToOne(
    type => EstudianteEntity,
    estudiante => estudiante.materias
  )
  estudiantes: EstudianteEntity[];

  @OneToMany(
    type => EventoMateriaEntity,
    eventoMateria => eventoMateria.eventoMateria
  )
  eventoMateria: EventoMateriaEntity[];

}