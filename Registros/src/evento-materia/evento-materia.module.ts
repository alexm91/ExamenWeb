import {Module} from '@nestjs/common';
import {EventoMateriaEntity} from './evento-materia.entity';
import { EventoMateriaService } from './evento-materia.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import { EventoMateriaController } from './evento-materia.controller';

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
      EventoMateriaController
    ],
    providers: [
      EventoMateriaService
    ],
    exports: [
      EventoMateriaService
    ]
  }
)

export class EventoMateriaModule {
  
}