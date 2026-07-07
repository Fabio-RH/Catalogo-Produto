import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryModel } from '../models/CategoryModel';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prisma: PrismaService) {}

  findByName(name: string) {
    return this.prisma.categoria.findFirst({
      where: {
        nome_categoria: name,
      },
    });
  }

  create(data: CategoryModel) {
    return this.prisma.categoria.create({
      data,
    });
  }

  async findOrCreate(name: string) {
    const category = await this.findByName(name);

    if (category) {
      return category;
    }

    return this.create({
      nome_categoria: name,
      descricao_categoria: name,
    });
  }
}