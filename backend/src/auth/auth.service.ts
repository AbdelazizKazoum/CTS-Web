import { CompteService } from './../compte/compte.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { UtilisateurService } from 'src/utilisateur/utilisateur.service';

@Injectable()
export class AuthService {
  constructor(
    private copmpteService: CompteService,
    private utilisateurService: UtilisateurService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.utilisateurService.findOne(signInDto.cin);

    if (!user) {
      return new UnauthorizedException();
    }

    return user;
  }
}
