import { ApiProperty } from '@nestjs/swagger';

export class CreateProdutoDto {
  @ApiProperty()
  nomeProduto: string;

  @ApiProperty()
  precoProduto: number;

  @ApiProperty({ required: false })
  categoriaId?: number;

  @ApiProperty({ required: false })
  estoqueId?: number;

  @ApiProperty({ required: false })
  urlImagem?: string;
}