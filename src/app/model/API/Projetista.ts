import { Produto } from './Produto';
import { ProjetistaTipo } from './ProjetistaTipo';

export interface Projetista {
    id: number;
    produtoId: number;
    tipoId: number;
    nome: string;
    produto: Produto;
    tipo: ProjetistaTipo;
}