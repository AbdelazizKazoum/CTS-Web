import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from './profile.entity';

@Entity()
export class Compte {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pseudo: string;

  @ManyToOne(() => Profile)
  @JoinColumn()
  function: number;

  @Column()
  pass: string;
}
