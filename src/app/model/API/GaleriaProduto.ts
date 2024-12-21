import { Galeria } from './Galeria';
import { Produto } from './Produto';

export interface GaleriaProduto {
    produtoId: number;
    galeriaId: number;
    dataCriacao: string;
    galeria: Galeria;
    produto: Produto;
}