import { Estado } from './Estado';

export interface Pais {
    id: number;
    nome: string;
    sigla: string;
    estado: Estado[];
}