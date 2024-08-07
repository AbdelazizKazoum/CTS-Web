import { Utilisateur } from 'src/entities/utilisateur.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from './profile.entity';

@Entity()
export class Compte {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pseudo: string;

  @OneToOne(() => Utilisateur, (utilisateur) => utilisateur.compte)
  @JoinColumn()
  utilisateur: Utilisateur;

  @ManyToOne(() => Profile, (profile) => profile.compts)
  @JoinColumn()
  profile: Profile;

  @Column({ select: false })
  pass: string;
}
