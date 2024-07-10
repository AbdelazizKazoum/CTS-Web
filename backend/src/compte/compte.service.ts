import { InjectRepository } from '@nestjs/typeorm';
import { CreateCompteDto } from './dto/create-compte.dto';
import { UpdateCompteDto } from './dto/update-compte.dto';
import { Compte } from 'src/entities/compte.entity';
import { Repository } from 'typeorm';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Utilisateur } from 'src/entities/utilisateur.entity';

const salt = 10;

@Injectable()
export class CompteService {
  constructor(
    @InjectRepository(Compte)
    private compteRepository: Repository<Compte>,
  ) {}

  async create(createCompteDto: CreateCompteDto) {
    console.log('hello from the service !!!');

    try {
      const password = createCompteDto.passe;
      console.log('test');
      console.log(password);
      console.log(createCompteDto);

      const hashPass = await bcrypt.hash(password, salt);

      const newCompte = await this.compteRepository.create({
        ...createCompteDto,
        pass: hashPass,
      });

      return await this.compteRepository.save(newCompte);
    } catch (error) {
      return new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    return await this.compteRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} compte`;
  }
  findByUser(user: Utilisateur) {
    return this.compteRepository.findOne({
      where: { utilisateur: user },
      relations: ['profile'],
    });
  }

  update(id: number, updateCompteDto: UpdateCompteDto) {
    return `This action updates a #${id} compte`;
  }

  remove(id: number) {
    return `This action removes a #${id} compte`;
  }
}
