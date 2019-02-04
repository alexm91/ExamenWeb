import {Module} from '@nestjs/common';
import {EstudianteEntity} from './estudiante.entity';
import { EstudianteCotroller } from './estudiante.controller';
import { EstudianteService } from './estudiante.service';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module(
  {
    imports: [
      TypeOrmModule
        .forFeature(
          [
            EstudianteEntity
          ])
    ],
    controllers: [
      EstudianteCotroller
    ],
    providers: [
      EstudianteService
    ],
    exports: [
      EstudianteService
    ]
  }
)

export class EstudianteModule {

}