import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEventoDto {

  @IsNotEmpty()
  @IsString()
  nombreEvento
}