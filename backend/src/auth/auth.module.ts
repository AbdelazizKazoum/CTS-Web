import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CompteModule } from 'src/compte/compte.module';
import { CompteService } from 'src/compte/compte.service';
import { UtilisateurService } from 'src/utilisateur/utilisateur.service';
import { UtilisateurModule } from 'src/utilisateur/utilisateur.module';

@Module({
  imports: [CompteModule, UtilisateurModule],
  controllers: [AuthController],
  providers: [AuthService, CompteService, UtilisateurService],
})
export class AuthModule {}
