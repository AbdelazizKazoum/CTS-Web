import { JwtService } from '@nestjs/jwt';
import { CompteService } from './../compte/compte.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { UtilisateurService } from 'src/utilisateur/utilisateur.service';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private compteService: CompteService,
    private utilisateurService: UtilisateurService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.utilisateurService.findOneByCin(signInDto.cin);

    if (!user) {
      return new UnauthorizedException('login failed !');
    }

    const compte = await this.compteService.findByUser(user);

    if (!compte) throw new UnauthorizedException("User doesn't have account! ");

    const payload = {
      ...user,
      direction: user.direction.nom_direction,
      role: compte.profile.libeleFunction,
    };

    return {
      user: payload,
      // token: await this.jwtService.signAsync(payload),
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: await this.jwtService.signAsync(payload, {
        secret: jwtConstants.secret,
        expiresIn: '30d',
      }),
    };
  }
}
