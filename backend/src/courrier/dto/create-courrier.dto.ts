import { Utilisateur } from 'src/entities/utilisateur.entity';

export class CreateCourrierDto {
  date_arrivee: Date;

  pre_reference: string;

  date_pre_reference: string;

  origine: string;

  reference: string;

  date_courrier: Date;

  objet: string;

  classement: string;

  date_traitement: Date;

  status: string;

  utilisateur: Utilisateur;

  modifier_par: Utilisateur;
}
