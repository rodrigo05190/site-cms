import { CentralVenda } from './CentralVenda';
import { Produto } from './Produto';

export interface CentralVendaProduto {
    centralVendaId: number;
    produtoId: number;
    id: number;
    centralVenda: CentralVenda;
    produto: Produto;
}