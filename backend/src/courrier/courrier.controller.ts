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
  Req,
  NotFoundException,
  Res,
  InternalServerErrorException,
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
import { Request, Response } from 'express';
import { stat } from 'node:fs/promises';
import * as path from 'path';
import * as fs from 'fs';

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
          const name = file.originalname.split('.')[0];
          const fileExtName = extname(file.originalname);
          const randomName = Array(10)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString())
            .join('');
          callback(
            null,
            `${name.split(' ').join('_')}-${randomName}${fileExtName}`,
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
    @Req() req,
  ) {
    const courrier = JSON.parse(data);

    const newCourrier = this.courrierService.create({
      ...courrier,
      utilisateur: req.user,
      filePath: file.filename,
    });

    console.log('file', file);

    return newCourrier;
  }

  @Get('file/:filePath')
  async findFile(@Param('filePath') filePath: string, @Res() res: Response) {
    const fileFullPath = join(process.cwd(), 'uploads', filePath);

    try {
      await stat(fileFullPath);
    } catch (error) {
      throw new NotFoundException('Fichier non trouvé');
    }

    res.sendFile(fileFullPath, (err) => {
      if (err) {
        throw new NotFoundException('Error serving file');
      }
    });
  }

  @Get()
  findAll(@Req() req) {
    const userRole = req.user?.role;
    if (!userRole) throw new InternalServerErrorException('Unothorized user!');
    console.log('🚀 ~ CourrierController ~ findAll ~ user:', userRole);
    if (userRole === 'Administrateur') {
      return this.courrierService.findAll();
    } else {
      return this.courrierService.findByUserRole(userRole);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courrierService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.secretariat)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req: Request, file, callback) => {
          console.log('req :', req.body.formData);
          const name = file.originalname.split('.')[0];
          const fileExtName = extname(file.originalname);
          const randomName = Array(10)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString())
            .join('');
          callback(
            null,
            `${name.split(' ').join('_')}-${randomName}${fileExtName}`,
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
  update(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
    @Body('formData') data: string,
  ) {
    const courrier = JSON.parse(data);

    const uploadFolder = path.join(process.cwd(), 'uploads');

    const fullPath = path.join(uploadFolder, courrier.filePath);
    console.log('🚀 ~ CourrierController ~ fullPath:', fullPath);

    if (fs.existsSync(fullPath)) {
      fs.unlink(fullPath, (error) => {
        if (error) {
          throw new Error(`Faild to modify this courrier`);
        }
      });
    }

    return this.courrierService.update(+id, {
      ...courrier,
      filePath: file.filename,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courrierService.remove(+id);
  }
}
