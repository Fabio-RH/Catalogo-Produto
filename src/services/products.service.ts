import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ListProductsQueryDto } from '../dto/list-products-query.dto';
import type { ProdutoWithRelations } from 'src/types/ProdutoWithRelations';
import { ProductsRepository } from 'src/repository/ProductsRepository';
import { CategoriesRepository } from 'src/repository/CategoriesRepository';
import { StocksRepository } from 'src/repository/StocksRepository';


@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly categoriesRepository: CategoriesRepository,
    private readonly stocksRepository: StocksRepository,
  ) {}

  async findAll(query: ListProductsQueryDto) {
    const { page = 1, limit = 12, category, search } = query;
    const skip = (page - 1) * limit;

    let categoriaId: number | undefined;

    if (category) {
      const categoria = await this.categoriesRepository.findByName(category);

      if (!categoria) {
        return {
          data: [],
          total: 0,
          page,
          limit,
        };
      }

      categoriaId = categoria.id_categoria;
    }

    const where = {
      ...(search ? { nome_produto: { contains: search } } : {}),
      ...(categoriaId !== undefined
        ? { categoria_id_categoria: categoriaId }
        : {}),
    };

    const [data, total] = await Promise.all([
      this.productsRepository.findAll(where, skip, limit),
      this.productsRepository.count(where),
    ]);

    return {
      data: data.map((product) => this.serialize(product)),
      total,
      page,
      limit,
    };
  }

  async findOne(id: string) {
    const idNum = this.parseProductId(id);

    const product = await this.productsRepository.findById(idNum);

    if (!product) {
      throw new NotFoundException(`Produto ${id} não encontrado`);
    }

    return this.serialize(product);
  }

  async create(dto: CreateProductDto) {
    const categoria = await this.categoriesRepository.findOrCreate(dto.category);

    const estoque = await this.stocksRepository.create({
      quantidade_estoque: dto.stock ?? 0,
      disponibilidade_estoque:
        (dto.stock ?? 0) > 0 ? 'DISPONIVEL' : 'INDISPONIVEL',
    });

    const product = await this.productsRepository.create({
      nome_produto: dto.name,
      preco_produto: Math.round(dto.price),
      url_imagem: dto.imageUrl ?? null,
      categoria_id_categoria: categoria.id_categoria,
      estoque_id_estoque: estoque.id_estoque,
    });

    return this.serialize(product);
  }

  async update(id: string, dto: UpdateProductDto) {
    const idNum = this.parseProductId(id);

    const existingProduct = await this.productsRepository.findById(idNum);

    if (!existingProduct) {
      throw new NotFoundException(`Produto ${id} não encontrado`);
    }

    const productData: Record<string, unknown> = {};

    if (dto.name !== undefined) {
      productData.nome_produto = dto.name;
    }

    if (dto.price !== undefined) {
      productData.preco_produto = Math.round(dto.price);
    }

    if (dto.imageUrl !== undefined) {
      productData.url_imagem = dto.imageUrl;
    }

    if (dto.category !== undefined) {
      const categoria = await this.categoriesRepository.findOrCreate(dto.category);
      productData.categoria_id_categoria = categoria.id_categoria;
    }

    let product = await this.productsRepository.update(idNum, productData);

    if (dto.stock !== undefined && product.estoque_id_estoque) {
      await this.stocksRepository.update(product.estoque_id_estoque, {
        quantidade_estoque: dto.stock,
        disponibilidade_estoque:
          dto.stock > 0 ? 'DISPONIVEL' : 'INDISPONIVEL',
      });

      const updatedProduct = await this.productsRepository.findById(idNum);

      if (updatedProduct) {
        product = updatedProduct;
      }
    }

    return this.serialize(product);
  }

  async remove(id: string) {
    const idNum = this.parseProductId(id);

    const product = await this.productsRepository.findById(idNum);

    if (!product) {
      throw new NotFoundException(`Produto ${id} não encontrado`);
    }

    await this.productsRepository.delete(idNum);
  }

  private parseProductId(id: string): number {
    const idNum = parseInt(id, 10);

    if (isNaN(idNum)) {
      throw new NotFoundException(`Produto ${id} não encontrado`);
    }

    return idNum;
  }

  private serialize(product: ProdutoWithRelations) {
    return {
      id: product.id_produto.toString(),
      name: product.nome_produto,
      description: '',
      price: product.preco_produto,
      imageUrl: product.url_imagem ?? '',
      category: product.categoria?.nome_categoria ?? 'sem categoria',
      sizes: [] as { size: string; stock: number }[],
      stock: product.estoque?.quantidade_estoque ?? 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
}
