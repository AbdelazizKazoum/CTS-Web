import { join } from 'node:path';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { CourrierService } from './courrier.service';
import { CreateCourrierDto } from './dto/create-courrier.dto';
import { UpdateCourrierDto } from './dto/update-courrier.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/enums/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Request } from 'express';

@UseGuards(AuthGuard, RolesGuard)
@Controller('courrier')
export class CourrierController {
  constructor(private readonly courrierService: CourrierService) {}

  @Post()
  @Roles(Role.Admin, Role.secretariat)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req: Request, file, callback) => {
          console.log('req :', req.body.formData);
          const formData = JSON.parse(req.body('formData'));
          const name = file.originalname.split('.')[0];
          const fileExtName = extname(file.originalname);
          const objet = formData.objet;
          const randomName = Array(4)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString())
            .join('');
          callback(
            null,
            `${objet.split(' ').join('-')}_${randomName}${fileExtName}`,
          );
        },
      }),
      limits: {
        fileSize: 1 * 1024 * 1024, //limit the size to 1mb
      },
      fileFilter: (req, file, callback) => {
        if (file.mimetype !== 'application/pdf') {
          return callback(
            new BadRequestException('Only PDF files ar allowed.'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body('formData') data: string,
  ) {
    const courrier = JSON.parse(data);

    console.log('courrier data ;', courrier);
    console.log('file :', file);

    const newCourrier = this.courrierService.create(courrier);

    console.log('file', file);

    return { ...file, filePath: `uploads/${file.filename}` };
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
