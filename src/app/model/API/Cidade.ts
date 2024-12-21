import { Estado } from './Estado';
import { CidadeRecomendada } from './CidadeRecomendada';
import { Bairro } from './Bairro';

export interface Cidade {
    id: number;
    nome: string;
    estadoId: number;
    estado: Estado;
    cidadeRecomendada: CidadeRecomendada;
    bairro: Bairro[];
}