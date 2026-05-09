import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEstoqueDto } from './dto/create-estoque.dto';

@Injectable()
export class EstoqueService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateEstoqueDto) {
    return await this.prisma.estoque.create({
      data,
    });
  }

  async findAll() {
    return await this.prisma.estoque.findMany();
  }

  async findOne(id: number) {
    const estoque = await this.prisma.estoque.findUnique({
      where: {
        idEstoque: id,
      },
    });

    if (!estoque) {
      throw new NotFoundException('Estoque não encontrado');
    }

    return estoque;
  }

  async update(id: number, data: any) {
    await this.findOne(id);

    return await this.prisma.estoque.update({
      where: {
        idEstoque: id,
      },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return await this.prisma.estoque.delete({
      where: {
        idEstoque: id,
      },
    });
  }
}