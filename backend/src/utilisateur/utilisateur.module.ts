import { Module } from '@nestjs/common';
import { UtilisateurController } from './utilisateur.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utilisateur } from 'src/entities/utilisateur.entity';
import { UtilisateurService } from './utilisateur.service';
import { JwtModule } from '@nestjs/jwt';
import { CourrierService } from 'src/courrier/courrier.service';
import { Courrier } from 'src/entities/courrier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Utilisateur, Courrier]), JwtModule],
  providers: [UtilisateurService, CourrierService],
  controllers: [UtilisateurController],
  exports: [TypeOrmModule],
})
export class UtilisateurModule {}
