import { Cidade } from './Cidade';
import { BairroRecomendado } from './BairroRecomendado';
import { BairroDestacadoNaHome } from './BairroDestacadoNaHome';
import { Endereco } from './Endereco';

export interface Bairro {
    id: number;
    nome: string;
    cidadeId: number;
    cidade: Cidade;
    bairroRecomendado: BairroRecomendado;
    bairroDestacadoNaHome: BairroDestacadoNaHome[];
    endereco: Endereco[];
}