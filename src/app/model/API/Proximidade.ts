import { ProximidadeTipo } from './ProximidadeTipo';
import { Endereco } from './Endereco';

export interface Proximidade {
    id: number;
    nome: string;
    distancia: number;
    tipoId: number;
    enderecoId: number;
    endereco: Endereco;
    tipo: ProximidadeTipo;
}