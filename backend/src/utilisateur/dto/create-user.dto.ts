import { Direction } from 'src/entities/direction.entity';

export class CreateUserDto {
  nom: string;
  prenom: string;
  matricule: string;
  direction: Direction;
}
