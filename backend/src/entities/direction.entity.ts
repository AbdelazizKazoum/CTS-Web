import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Utilisateur } from './utilisateur.entity';

@Entity()
export class Direction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom_direction: string;

  @OneToMany(() => Utilisateur, (utilisateur) => utilisateur.direction)
  @JoinColumn()
  utilisateurs: Utilisateur[];
}
