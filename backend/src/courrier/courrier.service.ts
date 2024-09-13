import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCourrierDto } from './dto/create-courrier.dto';
import { UpdateCourrierDto } from './dto/update-courrier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Courrier } from 'src/entities/courrier.entity';
import { MoreThan, Repository } from 'typeorm';
import * as dayjs from 'dayjs';
import { Direction } from 'src/entities/direction.entity';

@Injectable()
export class CourrierService {
  constructor(
    @InjectRepository(Courrier)
    private courrierRepository: Repository<Courrier>,

    @InjectRepository(Direction)
    private directionRepository: Repository<Direction>,
  ) {}

  // Ceate new courrier
  async create(createCourrierDto: CreateCourrierDto) {
    try {
      const newCourrier =
        await this.courrierRepository.create(createCourrierDto);
      return await this.courrierRepository.save(newCourrier);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Fetch all courriers
  async findAll() {
    return await this.courrierRepository.find({
      relations: [
        'utilisateur',
        'utilisateur.direction',
        'utilisateur.compte.profile',
        'modifier_par',
      ],
      order: {
        date_courrier: 'DESC',
      },
    });
  }

  // Search by user fonction
  async findByUserRole(role: string) {
    return await this.courrierRepository.find({
      relations: [
        'utilisateur',
        'utilisateur.direction',
        'utilisateur.compte.profile',
        'modifier_par',
      ],
      where: {
        utilisateur: {
          compte: {
            profile: {
              libeleFunction: role,
            },
          },
        },
      },
      order: {
        date_courrier: 'DESC',
      },
    });
  }

  // Recieved courriers
  async getCourriersRecu(direction: string) {
    return await this.courrierRepository.find({
      relations: [
        'utilisateur',
        'utilisateur.direction',
        'utilisateur.compte.profile',
        'modifier_par',
      ],
      where: {
        destinataire: direction,
        status: 'INTERNE',
      },
      order: {
        date_courrier: 'DESC',
      },
    });
  }

  // Search
  async findOne(id: number) {
    return await this.courrierRepository.findOne({
      where: { id },
      relations: ['utilisateur', 'modifier_par'],
    });
  }

  // Update
  update(id: number, updateCourrierDto: UpdateCourrierDto) {
    try {
      return this.courrierRepository.update(id, updateCourrierDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Remove
  remove(id: number) {
    return `This action removes a #${id} courrier`;
  }

  // Statistics
  async getStatistics() {
    //vars
    const lastYear = dayjs().subtract(1, 'year').toDate();
    const directions = await this.directionRepository.find();
    let directionsStatistics = [];

    try {
      // Count all created courriers
      const totalCourriers = await this.courrierRepository.count({
        where: {
          date_courrier: MoreThan(lastYear),
        },
      });

      // Statistics By directions
      directionsStatistics = await this.getCourriersCountByDirection(
        directions,
        lastYear,
      );

      // Statistics By courrier type
      const statisticsByType = await this.getCourriersCountByType(lastYear);

      return { directionsStatistics, totalCourriers, statisticsByType };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  // Count the nomber of courriers for each direction in the database and return an object with the direction name and the count of courriers
  async getCourriersCountByType(lastYear) {
    const countCourriersInterne = await this.courrierRepository.count({
      where: {
        date_courrier: MoreThan(lastYear),
        status: 'INTERNE',
      },
    });

    // Externe
    const countCourriersExterne = await this.courrierRepository.count({
      where: {
        date_courrier: MoreThan(lastYear),
        status: 'EXTERNE',
      },
    });

    // Sortant
    const countCourriersSortant = await this.courrierRepository.count({
      where: {
        date_courrier: MoreThan(lastYear),
        type: 'SORTANT',
      },
    });

    // Entrant
    const countCourriersEntrant = await this.courrierRepository.count({
      where: {
        date_courrier: MoreThan(lastYear),
        type: 'ENTRANT',
      },
    });

    return {
      sortant: countCourriersSortant,
      entrant: countCourriersEntrant,
      externe: countCourriersExterne,
      interne: countCourriersInterne,
    };
  }
  // Count the nomber of courriers for each direction in the database and return an object with the direction name and the count of courriers
  async getCourriersCountByDirection(directions: Direction[], lastYear) {
    let directionsStatistics = [];

    if (directions.length > 0) {
      for (const element of directions) {
        const countThisDirection = await this.courrierRepository.count({
          where: {
            date_courrier: MoreThan(lastYear),
            utilisateur: {
              direction: {
                nom_direction: element.nom_direction,
              },
            },
          },
        });

        directionsStatistics.push({
          nom: element.nom_direction,
          count: countThisDirection,
        });
      }

      return directionsStatistics;
    } else {
      return [];
    }
  }
}
