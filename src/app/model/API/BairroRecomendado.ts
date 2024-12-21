import { Bairro } from './Bairro';

export interface BairroRecomendado {
    bairroId: number;
    ordem: number;
    bairro: Bairro;
}