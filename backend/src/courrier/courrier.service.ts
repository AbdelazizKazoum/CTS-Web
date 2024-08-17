import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCourrierDto } from './dto/create-courrier.dto';
import { UpdateCourrierDto } from './dto/update-courrier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Courrier } from 'src/entities/courrier.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CourrierService {
  constructor(
    @InjectRepository(Courrier)
    private courrierRepository: Repository<Courrier>,
  ) {}

  async create(createCourrierDto: CreateCourrierDto) {
    try {
      const newCourrier =
        await this.courrierRepository.create(createCourrierDto);
      return await this.courrierRepository.save(newCourrier);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    return await this.courrierRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} courrier`;
  }

  update(id: number, updateCourrierDto: UpdateCourrierDto) {
    return `This action updates a #${id} courrier`;
  }

  remove(id: number) {
    return `This action removes a #${id} courrier`;
  }
}
