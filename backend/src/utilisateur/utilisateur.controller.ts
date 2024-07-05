import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
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

  @Get()
  async getByCin(@Param('cin') cin: string): Promise<Utilisateur> {
    return await this.utilisateurService.findOne(cin);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.utilisateurService.createUser(createUserDto);
  }
}
