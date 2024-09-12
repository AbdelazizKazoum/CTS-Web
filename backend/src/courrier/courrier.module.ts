import { Module } from '@nestjs/common';
import { CourrierService } from './courrier.service';
import { CourrierController } from './courrier.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Courrier } from 'src/entities/courrier.entity';
import { Direction } from 'src/entities/direction.entity';
import { DirectionService } from 'src/direction/direction.service';

@Module({
  imports: [TypeOrmModule.forFeature([Courrier, Direction])],
  controllers: [CourrierController],
  providers: [CourrierService, DirectionService],
  exports: [TypeOrmModule],
})
export class CourrierModule {}
