import { Imagem } from './Imagem';

export interface PaginaBairro {
    bairroId: number;
    descricao: string;
    h1: string;
    conteudo: string;
    bannerId: number | null;
    chave: string;
    coordenadas: string;
    banner: Imagem;
}