import { Module } from '@nestjs/common';
import { UtilisateurController } from './utilisateur.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utilisateur } from 'src/entities/utilisateur.entity';
import { UtilisateurService } from './utilisateur.service';
import { JwtModule } from '@nestjs/jwt';
import { CourrierService } from 'src/courrier/courrier.service';
import { Courrier } from 'src/entities/courrier.entity';
import { Direction } from 'src/entities/direction.entity';
import { DirectionService } from 'src/direction/direction.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Utilisateur, Courrier, Direction]),
    JwtModule,
  ],
  providers: [UtilisateurService, CourrierService, DirectionService],
  controllers: [UtilisateurController],
  exports: [TypeOrmModule],
})
export class UtilisateurModule {}
