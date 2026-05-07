export class CreateProdutoDto {
  nomeProduto: string;
  precoProduto: number;

  categoriaId?: number;
  estoqueId?: number;
}