import { Produto } from './Produto';

export interface Books {
  produtoId: number;
  link: string;
  descricao: string;
  produto: Produto;
  arquivos: File[];
}
