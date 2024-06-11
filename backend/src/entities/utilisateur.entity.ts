import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
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

  @ManyToOne(() => Compte)
  @JoinColumn()
  access_util: string;

  @ManyToOne(() => Direction)
  @JoinColumn()
  direction_util: string;
}
