import { Roles } from './../auth/decorators/roles.decorators';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request, RequestHandler } from 'express';
import { UtilisateurService } from './utilisateur.service';
import { UtilisateurModule } from './utilisateur.module';
import { Utilisateur } from 'src/entities/utilisateur.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@UseGuards(AuthGuard)
@Controller('utilisateur')
export class UtilisateurController {
  constructor(private readonly utilisateurService: UtilisateurService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  async getAll(@Req() request: Request): Promise<Utilisateur[]> {
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
