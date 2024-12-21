import { Bairro } from './Bairro';

export interface BairroDestacadoNaHome {
    id: number;
    bairroId: number;
    ordem: number;
    bairro: Bairro;
}