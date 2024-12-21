import { Diferencial } from './Diferencial';
import { Produto } from './Produto';

export interface DiferencialProduto {
    produtoId: number;
    diferencialId: number;
    diferencial: Diferencial;
    produto: Produto;
}
