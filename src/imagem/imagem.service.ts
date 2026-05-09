import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateImagemDto } from './dto/create-imagem.dto';

@Injectable()
export class ImagemService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateImagemDto) {
    return await this.prisma.imagem.create({
      data,
    });
  }

  async findAll() {
    return await this.prisma.imagem.findMany();
  }

  async findOne(id: number) {
    const imagem = await this.prisma.imagem.findUnique({
      where: {
        idImagem: id,
      },
    });

    if (!imagem) {
      throw new NotFoundException('Imagem não encontrada');
    }

    return imagem;
  }

  async update(id: number, data: any) {
    await this.findOne(id);

    return await this.prisma.imagem.update({
      where: {
        idImagem: id,
      },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return await this.prisma.imagem.delete({
      where: {
        idImagem: id,
      },
    });
  }
}