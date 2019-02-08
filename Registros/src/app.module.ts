import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import { EstudianteEntity } from './estudiante/estudiante.entity';
import { MateriaEntity } from './materia/materia.entity';
import { EventoEntity } from './evento/evento.entity';
import { EstudianteModule } from './estudiante/estudiante.module';
import { MateriaModule } from './materia/materia.module';
import { EventoModule } from './evento/evento.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: 'mysql',
        host: 'localhost',
        port: 32769,
        database: 'examen',
        username: 'web',
        password: '12345',
        synchronize: true,
        dropSchema: false,
        entities: [
          EstudianteEntity,
          MateriaEntity,
          EventoEntity
        ]
      }
    ),
    EstudianteModule,
    MateriaModule,
    EventoModule,
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
