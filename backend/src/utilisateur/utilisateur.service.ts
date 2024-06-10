import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Utilisateur } from 'src/entities/utilisateur.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UtilisateurService {
  constructor(
    @InjectRepository(Utilisateur)
    private utilisateurRepository: Repository<Utilisateur>,
  ) {}

  async findAll(): Promise<Utilisateur[]> {
    return await this.utilisateurRepository.find();
  }

  findOne(id: number): Promise<Utilisateur | null> {
    return this.utilisateurRepository.findOneBy({ id });
  }
}
