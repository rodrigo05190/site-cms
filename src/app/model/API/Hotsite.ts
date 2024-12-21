import { Imagem } from './Imagem';
import { Produto } from './Produto';

export interface Hotsite {
    produtoId: number;
    texto: string;
    imagemId: number;
    url: string;
    imagem: Imagem;
    produto: Produto;
}