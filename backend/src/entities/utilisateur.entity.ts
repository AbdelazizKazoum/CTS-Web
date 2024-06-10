import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  access_util: string;

  @Column()
  direction_util: string;
}
