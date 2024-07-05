import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Utilisateur } from 'src/entities/utilisateur.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UtilisateurService {
  constructor(
    @InjectRepository(Utilisateur)
    private utilisateurRepository: Repository<Utilisateur>,
  ) {}

  async findAll(): Promise<Utilisateur[]> {
    return await this.utilisateurRepository.find();
  }
  async createUser(createUserDto: CreateUserDto) {
    try {
      const newUser = await this.utilisateurRepository.create(createUserDto);

      return await this.utilisateurRepository.save(newUser);
    } catch (error) {
      return new InternalServerErrorException(error.message);
    }
  }

  async findOne(cin: string): Promise<Utilisateur | null> {
    return await this.utilisateurRepository.findOneBy({ cin });
  }
}
