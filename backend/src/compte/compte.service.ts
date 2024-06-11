import { InjectRepository } from '@nestjs/typeorm';
import { CreateCompteDto } from './dto/create-compte.dto';
import { UpdateCompteDto } from './dto/update-compte.dto';
import { Compte } from 'src/entities/compte.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CompteService {
  constructor(
    @InjectRepository(Compte)
    private compteRepository: Repository<Compte>,
  ) {}

  async create(createCompteDto: CreateCompteDto) {
    const newCompte = await this.compteRepository.create({
      pseudo: createCompteDto.pseudo,
      pass: createCompteDto.passe,
    });

    return await this.compteRepository.save(newCompte);
  }

  async findAll() {
    return await this.compteRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} compte`;
  }

  update(id: number, updateCompteDto: UpdateCompteDto) {
    return `This action updates a #${id} compte`;
  }

  remove(id: number) {
    return `This action removes a #${id} compte`;
  }
}
