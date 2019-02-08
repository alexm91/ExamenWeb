import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMateriaDto {

  @IsNotEmpty()
  @IsString()
  nombreMateria: string;

  @IsNotEmpty()
  @IsString()
  codigo: string;

  @IsOptional()
  descripcion: string;


}