import { Cidade } from './Cidade';

export interface CidadeRecomendada {
    cidadeId: number;
    ordem: number;
    cidade: Cidade;
}