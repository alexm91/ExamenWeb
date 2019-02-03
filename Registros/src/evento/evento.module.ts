import {Module} from '@nestjs/common';
import {EventoEntity} from './evento.entity';

import {TypeOrmModule} from '@nestjs/typeorm';

@Module(
  {
    imports: [
      TypeOrmModule
        .forFeature(
          [
            EventoEntity
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

export class EventoModule {

}