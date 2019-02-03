import {Module} from '@nestjs/common';
import {MateriaEntity} from './materia.entity';

import {TypeOrmModule} from '@nestjs/typeorm';

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

    ],
    controllers: [

    ],
    exports: [

    ]
  }
)

export class MateriaModule {

}