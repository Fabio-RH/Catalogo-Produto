import { ApiProperty } from '@nestjs/swagger';

export class CreateProdutoDto {

  @ApiProperty()
  nomeProduto: string;

  @ApiProperty()
  precoProduto: number;
}