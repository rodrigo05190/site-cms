import { Pais } from './Pais';
import { Cidade } from './Cidade';

export interface Estado {
    id: number;
    nome: string;
    paisId: number;
    uf: string;
    pais: Pais;
    cidade: Cidade[];
}