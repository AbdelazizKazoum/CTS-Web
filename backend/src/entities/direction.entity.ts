import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Direction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom_direction: string;
}
