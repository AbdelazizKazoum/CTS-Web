import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CourrierService } from './courrier.service';
import { CreateCourrierDto } from './dto/create-courrier.dto';
import { UpdateCourrierDto } from './dto/update-courrier.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/enums/role.enum';

@UseGuards(AuthGuard, RolesGuard)
@Controller('courrier')
export class CourrierController {
  constructor(private readonly courrierService: CourrierService) {}

  @Post()
  @Roles(Role.Admin, Role.secretariat)
  create(@Body() createCourrierDto: CreateCourrierDto) {
    return this.courrierService.create(createCourrierDto);
  }

  @Get()
  findAll() {
    return this.courrierService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courrierService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCourrierDto: UpdateCourrierDto,
  ) {
    return this.courrierService.update(+id, updateCourrierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courrierService.remove(+id);
  }
}
