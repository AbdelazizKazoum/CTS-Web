import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Utilisateur } from './utilisateur.entity';

@Entity()
export class Courrier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date_arrivee: Date;

  @Column()
  pre_reference: string;

  @Column()
  date_pre_reference: string;

  @Column()
  origine: string;

  @Column()
  reference: string;

  @Column()
  date_courrier: Date;

  @Column()
  objet: string;

  @Column()
  classement: string;

  @Column()
  date_traitement: Date;

  @Column()
  status: string;

  @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.courrier)
  @JoinColumn()
  utilisateur: Utilisateur;

  @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.courrier)
  modifier_par: Utilisateur;
}
