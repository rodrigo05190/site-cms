import { Contato } from './Contato';

export interface OrigemContato {
    id: number;
    nome: string;
    chave: string;
    contato: Contato[];
}