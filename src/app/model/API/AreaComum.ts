import { Produto } from './Produto';

export interface AreaComum {
  id: number;
  produtoId: number;
  tipoId: number;
  quantidade: number;
  produto: Produto;
  descricao: string;
  ordem: number;
  iconeId: number;
  // tipo: AreaComumTipo;
}
