import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Compte {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pseudo: string;

  @Column()
  passe: string;
}
