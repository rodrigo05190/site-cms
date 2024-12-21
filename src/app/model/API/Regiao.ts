import { HypnoboxRegiao } from './HypnoboxRegiao';
import { Endereco } from './Endereco';

export interface Regiao {
    id: number;
    nome: string;
    hypnoboxRegiao: HypnoboxRegiao;
    endereco: Endereco[];
}