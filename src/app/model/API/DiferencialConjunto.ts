import { Conjunto } from './Conjunto';
import { DiferencialTipo } from './DiferencialTipo';

export interface DiferencialConjunto {
    id: number;
    conjuntoId: number;
    diferencialId: number;
    texto: string;
    dataCriacao: string;
    dataAtualizacao: string | null;
    conjunto: Conjunto;
    diferencial: DiferencialTipo;
}