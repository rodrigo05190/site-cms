import { Produto } from './Produto';

export interface ProdutosRelacionados {
    produtoId: number;
    produtoRelacionadoId: number;
    produto: Produto;
    produtoRelacionado: Produto;
}