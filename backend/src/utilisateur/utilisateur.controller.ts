import { Roles } from './../auth/decorators/roles.decorators';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request, RequestHandler } from 'express';
import { UtilisateurService } from './utilisateur.service';
import { UtilisateurModule } from './utilisateur.module';
import { Utilisateur } from 'src/entities/utilisateur.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UpdateCompteDto } from 'src/compte/dto/update-compte.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(AuthGuard, RolesGuard)
@Controller('utilisateur')
export class UtilisateurController {
  constructor(private readonly utilisateurService: UtilisateurService) {}

  @Get()
  @Roles(Role.Admin)
  async getAll(@Req() request: Request): Promise<Utilisateur[]> {
    return await this.utilisateurService.findAll();
  }

  @Get('/:id')
  @Roles(Role.Admin, Role.utilisateur)
  async getUser(@Param('id') id: number): Promise<Utilisateur> {
    return await this.utilisateurService.findOne(id);
  }

  @Get('/cin/:cin')
  @Roles(Role.Admin, Role.utilisateur)
  async getByCin(@Param('cin') cin: string): Promise<Utilisateur> {
    return await this.utilisateurService.findOneByCin(cin);
  }

  @Post()
  @Roles(Role.Admin)
  @UseInterceptors(FileInterceptor('file'))
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log('hello test files :', createUserDto);

    console.log(file);

    return await this.utilisateurService.createUser(createUserDto);
  }

  @Put()
  @Roles(Role.Admin)
  async updateUser(@Body() UpdateUserDto) {
    return await this.utilisateurService.updateUser(UpdateUserDto);
  }
}
