import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProdutoDto } from './dto/create-produto.dto';

@Injectable()
export class ProdutoService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProdutoDto) {
    try {
      console.log('DTO RECEBIDO:', JSON.stringify(data, null, 2));

      return await this.prisma.produto.create({
        data: {
          nomeProduto: data.nomeProduto,
          precoProduto: data.precoProduto,
          categoriaId: data.categoriaId,
          estoqueId: data.estoqueId,
          urlImagem: data.urlImagem,
        },
      });
    } catch (error) {
      console.error('ERRO COMPLETO:');
      console.error(error);

      throw error;
    }
  }

  async findAll() {
    return await this.prisma.produto.findMany();
  }

  async findOne(id: number) {
    const produto = await this.prisma.produto.findUnique({
      where: {
        idProduto: id,
      },
    });

    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }

    return produto;
  }

  async update(id: number, data: any) {
    await this.findOne(id);

    return await this.prisma.produto.update({
      where: {
        idProduto: id,
      },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return await this.prisma.produto.delete({
      where: {
        idProduto: id,
      },
    });
  }

  async validarItensPedido(
    itens: { produtoId: number; quantidade: number }[],
  ) {
    const itensDisponiveis: { produtoId: number }[] = [];

    for (const item of itens) {
      const produto = await this.prisma.produto.findUnique({
        where: {
          idProduto: item.produtoId,
        },
      });

      if (!produto || !produto.estoqueId) {
        continue;
      }

      const estoque = await this.prisma.estoque.findUnique({
        where: {
          idEstoque: produto.estoqueId,
        },
      });

      if (!estoque) {
        continue;
      }

      if (estoque.quantidadeEstoque >= item.quantidade) {
        itensDisponiveis.push({
          produtoId: produto.idProduto,
        });
      }
    }

    return {
      itensDisponiveis,
    };
  }
}