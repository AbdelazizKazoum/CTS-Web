import { Controller, Get, Req } from '@nestjs/common';
import { Request, RequestHandler } from 'express';

@Controller('utilisateur')
export class UtilisateurController {
  @Get()
  findAll(@Req() request: Request): string {
    return 'hello world ';
  }
}
