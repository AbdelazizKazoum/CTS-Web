import { Direction } from 'src/entities/direction.entity';

export class UpdateUserDto {
  id: number;
  nom: string;
  prenom: string;
  cin: string;
  matricule: string;
  direction: Direction;
}
