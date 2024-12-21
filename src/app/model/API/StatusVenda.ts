import { Produto } from './Produto';

export interface StatusVenda {
    id: number;
    nome: string;
    produto: Produto[];
}