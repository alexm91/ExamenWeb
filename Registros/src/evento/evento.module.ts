import {Module} from '@nestjs/common';
import {EventoEntity} from './evento.entity';
import {EventoService} from './evento.service';

import {TypeOrmModule} from '@nestjs/typeorm';
import { EventoController } from './evento.controller';
import { MateriaEntity } from '../materia/materia.entity';
import { MateriaService } from '../materia/materia.service';
import { MateriaModule } from '../materia/materia.module';

@Module(
  {
    imports: [
      TypeOrmModule
        .forFeature(
          [
            EventoEntity,
            MateriaEntity
          ])
    ],
    modules:[
      MateriaModule
    ],
    controllers: [
      EventoController
    ],
    providers: [
      EventoService,
      MateriaService
    ],
    exports: [
      EventoService
    ]
  }
)

export class EventoModule {

}