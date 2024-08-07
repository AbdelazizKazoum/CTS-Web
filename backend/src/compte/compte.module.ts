import { Module } from '@nestjs/common';
import { CompteService } from './compte.service';
import { CompteController } from './compte.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/entities/profile.entity';
import { Compte } from 'src/entities/compte.entity';
import { UtilisateurService } from 'src/utilisateur/utilisateur.service';
import { UtilisateurController } from 'src/utilisateur/utilisateur.controller';
import { Utilisateur } from 'src/entities/utilisateur.entity';

@Module({
  // imports: [TypeOrmModule.forFeature([Profile])],
  // providers: [CompteService],
  // controllers: [CompteController],
  // exports: [TypeOrmModule],

  imports: [TypeOrmModule.forFeature([Compte, Utilisateur])],
  providers: [CompteService, UtilisateurService],
  controllers: [CompteController],
  exports: [TypeOrmModule],
})
export class CompteModule {}
