import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEstudianteDto {

  @IsNotEmpty()
  @IsString()
  nombres: string;

  @IsNotEmpty()
  @IsString()
  apellidos: string;

  @IsNotEmpty()
  @IsNumber()
  semestreActual: number;

}