import { Produto } from './Produto';

export interface CardHome {
    id: number;
    produtoId: number;
    ordem: number;
    produto: Produto;
}