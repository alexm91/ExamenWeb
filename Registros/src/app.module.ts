import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import { EstudianteEntity } from './estudiante/estudiante.entity';
import { MateriaEntity } from './materia/materia.entity';
import { EventoEntity } from './evento/evento.entity';
import { EventoMateriaEntity } from './evento-materia/evento-materia.entity';
import { EstudianteModule } from './estudiante/estudiante.module';
import { MateriaModule } from './materia/materia.module';
import { EventoModule } from './evento/evento.module';
import { EventoMateriaModule } from './evento-materia/evento-materia.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: 'mysql',
        host: 'localhost',
        port: 32775,
        database: 'examen',
        username: 'web',
        password: '12345',
        synchronize: true,
        dropSchema: false,
        entities: [
          EstudianteEntity,
          MateriaEntity,
          EventoEntity,
          EventoMateriaEntity
        ]
      }
    ),
    EstudianteModule,
    MateriaModule,
    EventoModule,
    EventoMateriaModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule {

}
