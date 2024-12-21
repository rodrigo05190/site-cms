import { StatusVenda } from './StatusVenda';
import { ImagemProduto } from './ImagemProduto';
import { Imagem } from './Imagem';

export interface ProdutoCard {
  id: number;
  nome: string;
  bairro: string;
  cidade: string;
  areaTerreno: number;
  idEmpreendimentoMega: number | null;
  conjuntoQuantidade: number;
  promocao: boolean;
  ativo: boolean;
  relevancia: number;
  statusConjunto: {
    id: number;
    nome: string;
    quantidade: number
  }[];
  statusVenda: StatusVenda;
  imagemProduto: ImagemProduto;
}
