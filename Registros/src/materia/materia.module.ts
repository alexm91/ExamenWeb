import {Module} from '@nestjs/common';
import {MateriaEntity} from './materia.entity';

import {TypeOrmModule} from '@nestjs/typeorm';
import { MateriaService } from './materia.service';
import { MateriaController } from './materia.controller';

@Module(
  {
    imports: [
      TypeOrmModule
        .forFeature(
          [
            MateriaEntity
          ])
    ],
    providers: [
      MateriaService
    ],
    controllers: [
      MateriaController
    ],
    exports: [
      MateriaService
    ]
  }
)

export class MateriaModule {

}