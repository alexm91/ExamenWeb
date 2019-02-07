import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEstudianteDto {

  @IsNotEmpty()
  @IsString()
  nombres: string;

  @IsNotEmpty()
  @IsString()
  apellidos: string;

  @IsNotEmpty()
  @IsString()
  fechaNacimiento: string;

  @IsNotEmpty()
  @IsNumber()
  semestreActual: number;

}