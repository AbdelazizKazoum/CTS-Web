import { Module } from '@nestjs/common';
import { DirectionService } from './direction.service';
import { DirectionController } from './direction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Direction } from 'src/entities/direction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Direction])],
  controllers: [DirectionController],
  providers: [DirectionService],
  exports: [TypeOrmModule],
})
export class DirectionModule {}
