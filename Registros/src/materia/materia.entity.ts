import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany } from 'typeorm';
import { EstudianteEntity} from '../estudiante/estudiante.entity';
import { EventoEntity } from 'src/evento/evento.entity';

@Entity('materia')
export class MateriaEntity {

  @PrimaryGeneratedColumn()
  materiaId: number;

  @Column({
    name: 'Materia',
    type: 'varchar',
    length: 25,
  })
  nombreMateria: string;

  @Column({
    name: 'Codigo',
    type: 'varchar',
    length: 6,
  })
  codigo: string;

  @Column({
    name: 'Descripcion',
    type: 'varchar',
    length: 50,
  })
  descripcion: string;

  @Column({
    name: 'Activo',
    type: 'boolean',
  })
  activo: boolean;

  @Column({
    name: 'Fecha de Creacion',
    type: 'date',
  })
  fechaCreacion: string;

  @Column({
    name: 'Numero de Horas por Semana',
    type: 'int',
  })
  numeroHorasPorSemana: number;

  @ManyToOne(
    type => EstudianteEntity,
    estudiante => estudiante.materias,
  )
  estudiante: EstudianteEntity;

  @ManyToMany(
    type => EventoEntity,
    evento => evento.materias)
  eventos: EventoEntity[];


}