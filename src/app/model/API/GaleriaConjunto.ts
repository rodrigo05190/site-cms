import { Conjunto } from './Conjunto';
import { Galeria } from './Galeria';

export interface GaleriaConjunto {
    conjuntoId: number;
    galeriaId: number;
    dataCriacao: string;
    conjunto: Conjunto;
    galeria: Galeria;
}