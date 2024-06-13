import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request, RequestHandler } from 'express';
import { UtilisateurService } from './utilisateur.service';
import { UtilisateurModule } from './utilisateur.module';
import { Utilisateur } from 'src/entities/utilisateur.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('utilisateur')
export class UtilisateurController {
  constructor(private readonly utilisateurService: UtilisateurService) {}

  @Get()
  async getAll(): Promise<Utilisateur[]> {
    return await this.utilisateurService.findAll();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.utilisateurService.createUser(createUserDto);
  }
}
