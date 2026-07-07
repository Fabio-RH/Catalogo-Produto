export class ProductModel {
  nome_produto!: string;
  preco_produto!: number;
  categoria_id_categoria?: number | null;
  estoque_id_estoque?: number | null;
  url_imagem?: string | null;
}