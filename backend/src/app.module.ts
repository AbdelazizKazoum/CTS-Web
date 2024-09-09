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
import { AuthModule } from './auth/auth.module';
import { Courrier } from './entities/courrier.entity';
import { CourrierModule } from './courrier/courrier.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.localhost,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Utilisateur, Compte, Profile, Direction, Courrier],
      synchronize: true,
    }),
    UtilisateurModule,
    CompteModule,
    ProfileModule,
    DirectionModule,
    AuthModule,
    CourrierModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
