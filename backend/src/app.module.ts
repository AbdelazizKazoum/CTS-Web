import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
import { Utilisateur } from './entities/utilisateur.entity';
import { CompteModule } from './compte/compte.module';
import { Compte } from './entities/compte.entity';
import { ProfileModule } from './profile/profile.module';
import { Profile } from './entities/profile.entity';
import { DirectionModule } from './direction/direction.module';
import { Direction } from './entities/direction.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '051688aziz',
      database: 'cts_web',
      entities: [Utilisateur, Compte, Profile, Direction],
      synchronize: true,
    }),
    UtilisateurModule,
    CompteModule,
    ProfileModule,
    DirectionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
