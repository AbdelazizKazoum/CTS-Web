import { Profile } from 'src/entities/profile.entity';
import { Utilisateur } from 'src/entities/utilisateur.entity';

export class UpdateCompteDto {
  id: number;
  pseudo: string;
  pass?: string;
  profile: Profile;
}
