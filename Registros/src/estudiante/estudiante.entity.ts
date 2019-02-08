import { Column, Entity, Index, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { MateriaEntity } from '../materia/materia.entity';

@Entity('estudiante')
export class EstudianteEntity {

  @PrimaryGeneratedColumn()
  estudianteId: number;

  @Column({
    name: 'Nombres',
    type: 'varchar',
    length: 30
  })
  nombres: string;

  @Column({
    name: 'Apellidos',
    type: 'varchar',
    length: 30
  })
  apellidos: string;

  @Column({
    name: 'Fecha de Nacimiento',
    type: 'date',
  })
  fechaNacimiento: string;

  @Column({
    name: 'Semestre Actual',
    type: 'int',
  })
  semestreActual: number;

  @Column({
    name: 'Graduado',
    type: 'boolean'
  })
  graduado: boolean

  @OneToMany(
    type => MateriaEntity,
    materia => materia.estudiante
  )
  materias: MateriaEntity[];
}