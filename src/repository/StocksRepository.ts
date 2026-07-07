import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StockModel } from '../models/StockModel';

@Injectable()
export class StocksRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: StockModel) {
    return this.prisma.estoque.create({
      data,
    });
  }

  update(id: number, data: StockModel) {
    return this.prisma.estoque.update({
      where: {
        id_estoque: id,
      },
      data,
    });
  }
}