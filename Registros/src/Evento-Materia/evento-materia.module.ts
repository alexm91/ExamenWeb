import {Module} from '@nestjs/common';
import {EventoMateriaEntity} from './evento-materia.entity';

import {TypeOrmModule} from '@nestjs/typeorm'

@Module(
  {
    imports: [
      TypeOrmModule
        .forFeature(
          [
            EventoMateriaEntity
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

export class EventoMateriaModule {
  
}