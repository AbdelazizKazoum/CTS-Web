import { Utilisateur } from './../entities/utilisateur.entity';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { clearParserCache } from 'mysql2';
import { Courrier } from 'src/entities/courrier.entity';

@Injectable()
export class UtilisateurService {
  constructor(
    @InjectRepository(Utilisateur)
    private utilisateurRepository: Repository<Utilisateur>,

    @InjectRepository(Courrier)
    private courrierRepository: Repository<Courrier>,
  ) {}

  async checkUser(cin): Promise<any> {
    const check = await this.utilisateurRepository.findBy({
      cin: cin,
    });

    return check;
  }
  async findAll(): Promise<Utilisateur[]> {
    return await this.utilisateurRepository.find({
      relations: ['direction'],
    });
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const check = await this.checkUser(createUserDto.cin);

      if (check.length > 0) {
        console.log('found : ', check);
        throw new ConflictException('User already exists');
      }
      const newUser = await this.utilisateurRepository.create(createUserDto);

      return await this.utilisateurRepository.save(newUser);
    } catch (error) {
      return new InternalServerErrorException(error.message);
    }
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    try {
      if (updateUserDto) {
        const { id, nom, prenom, matricule, direction, cin } = updateUserDto;
        const check = await this.checkUser(cin);

        console.log('test update with user not exists :', check);

        if (check.length <= 0)
          throw new NotFoundException('User is not exists !');

        return await this.utilisateurRepository.update(id, {
          nom,
          prenom,
          cin,
          matricule,
          direction,
        });
      } else {
        throw new BadRequestException('No data is prodided !');
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number): Promise<any> {
    const user = await this.utilisateurRepository.findOne({
      where: { id },
      relations: ['direction', 'compte', 'compte.profile'],
    });

    if (!user) throw new NotFoundException('Non trouvé');

    const countCreatedCourriers = await this.courrierRepository.count({
      where: { utilisateur: user },
    });

    const countModifiedCourriers = await this.courrierRepository.count({
      where: {
        modifier_par: user,
      },
    });

    return {
      ...user,
      countCourriers: countCreatedCourriers,
      countCodifiedCourriers: countModifiedCourriers,
    };
  }

  async findOneByCin(cin: string): Promise<Utilisateur | null> {
    return await this.utilisateurRepository.findOne({
      where: { cin },
      relations: ['direction'],
    });
  }
}
