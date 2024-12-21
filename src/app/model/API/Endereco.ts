import { Bairro } from './Bairro';
import { Regiao } from './Regiao';
import { CentralVenda } from './CentralVenda';
import { Conjunto } from './Conjunto';
import { Produto } from './Produto';
import { Proximidade } from './Proximidade';

export interface Endereco {
    id: number;
    cep: string;
    logradouro: string;
    regiaoId: number | null;
    coordenada: string;
    numero: string;
    bairroId: number;
    complemento: string;
    bairro: Bairro;
    regiao: Regiao;
    centralVenda: CentralVenda[];
    conjunto: Conjunto[];
    produto: Produto[];
    proximidade: Proximidade[];
}