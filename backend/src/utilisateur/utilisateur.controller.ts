import { Controller, Get, Req } from '@nestjs/common';
import { Request, RequestHandler } from 'express';
import { UtilisateurService } from './utilisateur.service';
import { UtilisateurModule } from './utilisateur.module';
import { Utilisateur } from 'src/entities/utilisateur.entity';

@Controller('utilisateur')
export class UtilisateurController {
  constructor(private readonly utilisateurService: UtilisateurService) {}

  @Get()
  async getAll(): Promise<Utilisateur[]> {
    return await this.utilisateurService.findAll();
  }
}
