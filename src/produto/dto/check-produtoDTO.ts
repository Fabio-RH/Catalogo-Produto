export class ItemPedidoDto {
  produtoId: number;
  quantidade: number;
}

export class ValidarItensDto {
  itens: ItemPedidoDto[];
}