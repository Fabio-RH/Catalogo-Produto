import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductModel } from '../models/ProductModel';

@Injectable()
export class ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(where: object, skip: number, take: number) {
    return this.prisma.produto.findMany({
      where,
      include: {
        categoria: true,
        estoque: true,
      },
      skip,
      take,
      orderBy: {
        id_produto: 'asc',
      },
    });
  }

  count(where: object) {
    return this.prisma.produto.count({
      where,
    });
  }

  findById(id: number) {
    return this.prisma.produto.findUnique({
      where: {
        id_produto: id,
      },
      include: {
        categoria: true,
        estoque: true,
      },
    });
  }

  create(data: ProductModel) {
    return this.prisma.produto.create({
      data,
      include: {
        categoria: true,
        estoque: true,
      },
    });
  }

  update(id: number, data: Partial<ProductModel>) {
    return this.prisma.produto.update({
      where: {
        id_produto: id,
      },
      data,
      include: {
        categoria: true,
        estoque: true,
      },
    });
  }

  delete(id: number) {
    return this.prisma.produto.delete({
      where: {
        id_produto: id,
      },
    });
  }
}