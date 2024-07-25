import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateDirectionDto } from './dto/create-direction.dto';
import { UpdateDirectionDto } from './dto/update-direction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Direction } from 'src/entities/direction.entity';

@Injectable()
export class DirectionService {
  constructor(
    @InjectRepository(Direction)
    private directionRepository: Repository<Direction>,
  ) {}

  async create(createDirectionDto: CreateDirectionDto) {
    try {
      const newDirection =
        await this.directionRepository.create(createDirectionDto);

      return await this.directionRepository.save(newDirection);
    } catch (error) {
      return new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    try {
      const directions = await this.directionRepository.find();

      return directions;
    } catch (error) {
      return new InternalServerErrorException(error.message);
    }
    return `This action returns all direction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} direction`;
  }

  update(id: number, updateDirectionDto: UpdateDirectionDto) {
    return `This action updates a #${id} direction`;
  }

  remove(id: number) {
    return `This action removes a #${id} direction`;
  }
}
