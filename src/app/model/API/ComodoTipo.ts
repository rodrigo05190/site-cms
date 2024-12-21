import { PlantaComodo } from './PlantaComodo';

export interface ComodoTipo {
    id: number;
    nome: string;
    icone: string;
    plantaComodo: PlantaComodo[];
}