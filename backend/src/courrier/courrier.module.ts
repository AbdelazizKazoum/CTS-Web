import { Module } from '@nestjs/common';
import { CourrierService } from './courrier.service';
import { CourrierController } from './courrier.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Courrier } from 'src/entities/courrier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Courrier])],
  controllers: [CourrierController],
  providers: [CourrierService],
  exports: [TypeOrmModule],
})
export class CourrierModule {}
