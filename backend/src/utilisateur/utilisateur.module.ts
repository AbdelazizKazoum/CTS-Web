import { Module } from '@nestjs/common';
import { UtilisateurController } from './utilisateur.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utilisateur } from 'src/entity/utilisateur.entity';
import { UtilisateurService } from './utilisateur.service';

@Module({
  imports: [TypeOrmModule.forFeature([Utilisateur])],
  providers: [UtilisateurService],
  controllers: [UtilisateurController],
  exports: [TypeOrmModule],
})
export class UtilisateurModule {}
