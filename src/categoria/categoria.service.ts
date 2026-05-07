import {Injectable, NotFoundException,} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';

@Injectable()
export class CategoriaService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCategoriaDto) {
    return await this.prisma.categoria.create({
      data,
    });
  }

  async findAll() {
    return await this.prisma.categoria.findMany({
      include: {
        produtos: true,
      },
    });
  }

  async findOne(id: number) {
    const categoria = await this.prisma.categoria.findUnique({
      where: {
        idCategoria: id,
      },
      include: {
        produtos: true,
      },
    });

    if (!categoria) {
      throw new NotFoundException('Categoria não encontrada');
    }

    return categoria;
  }

  async update(id: number, data: any) {
    await this.findOne(id);

    return await this.prisma.categoria.update({
      where: {
        idCategoria: id,
      },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return await this.prisma.categoria.delete({
      where: {
        idCategoria: id,
      },
    });
  }
}