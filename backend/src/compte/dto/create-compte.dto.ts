import { Profile } from 'src/entities/profile.entity';
import { Utilisateur } from 'src/entities/utilisateur.entity';

export class CreateCompteDto {
  pseudo: string;
  passe: string;
  profileId: Profile;
  utilisateurId: Utilisateur;
}
