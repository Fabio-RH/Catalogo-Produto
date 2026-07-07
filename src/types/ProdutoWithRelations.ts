export type ProdutoWithRelations = {
  id_produto: number;
  nome_produto: string;
  preco_produto: number;
  url_imagem: string | null;
  categoria: { nome_categoria: string } | null;
  estoque: { id_estoque: number; quantidade_estoque: number } | null;
};
