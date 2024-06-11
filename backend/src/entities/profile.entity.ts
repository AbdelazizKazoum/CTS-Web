import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Compte } from './compte.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  libeleFunction: string;

  @OneToMany(() => Compte, (compte) => compte.fonction)
  @JoinColumn()
  compts: Compte[];
}
