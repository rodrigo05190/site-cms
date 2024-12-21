import { Imagem } from './Imagem';
import { Produto } from './Produto';

export interface ImagemProduto {
    produtoId: number;
    logoId: number | null;
    bannerId: number | null;
    fachadaId: number | null;
    banner: Imagem;
    fachada: Imagem;
    logo: Imagem;
    produto: Produto;
}