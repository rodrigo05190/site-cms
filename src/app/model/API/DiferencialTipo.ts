import { Diferencial } from './Diferencial';
import { DiferencialConjunto } from './DiferencialConjunto';

export interface DiferencialTipo {
    id: number;
    nome: string;
    icone: string;
    diferencial: Diferencial[];
    diferencialConjunto: DiferencialConjunto[];
}