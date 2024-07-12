import { Direction } from 'src/entities/direction.entity';

export class CreateUserDto {
  nom: string;
  prenom: string;
  cin: string;
  matricule: string;
  direction: Direction;
}
