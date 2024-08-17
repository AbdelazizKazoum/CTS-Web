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

  @Column({ nullable: true })
  date_arrivee: Date;

  @Column({ nullable: true })
  pre_reference: string;

  @Column({ nullable: true })
  date_pre_reference: string;

  @Column({ nullable: true })
  origine: string;

  @Column({ nullable: true })
  reference: string;

  @Column({ nullable: true })
  date_courrier: Date;

  @Column({ nullable: true })
  objet: string;

  @Column({ nullable: true })
  classement: string;

  @Column({ nullable: true })
  date_traitement: Date;

  @Column({ default: 'INTERNE' })
  status: string;

  @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.courrier)
  @JoinColumn()
  utilisateur: Utilisateur;

  @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.modifier_courrier)
  @JoinColumn()
  modifier_par: Utilisateur;
}
