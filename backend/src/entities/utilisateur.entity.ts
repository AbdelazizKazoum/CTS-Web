import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Compte } from './compte.entity';
import { Direction } from './direction.entity';

@Entity()
export class Utilisateur {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column()
  matricule: string;

  @OneToOne(() => Compte)
  @JoinColumn()
  compte: Compte;

  @ManyToOne(() => Direction, (direction) => direction.utilisateurs)
  @JoinColumn()
  direction: Direction;
}
