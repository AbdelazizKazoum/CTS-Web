import { JwtService } from '@nestjs/jwt';
import { CompteService } from './../compte/compte.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { UtilisateurService } from 'src/utilisateur/utilisateur.service';

@Injectable()
export class AuthService {
  constructor(
    private compteService: CompteService,
    private utilisateurService: UtilisateurService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.utilisateurService.findOne(signInDto.cin);

    if (!user) {
      return new UnauthorizedException();
    }
    const compte = await this.compteService.findByUser(user);

    const payload = {
      ...user,
      direction: user.direction.nom_direction,
      role: compte.profile.libeleFunction,
    };

    return { token: await this.jwtService.signAsync(payload) };
  }
}
