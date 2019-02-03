import {Module} from '@nestjs/common';
import {EstudianteEntity} from './estudiante.entity';

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

    ],
    providers: [

    ],
    exports: [

    ]
  }
)

export class EstudianteModule {

}