import { GaleriaImagem } from './GaleriaImagem';
import { Hotsite } from './Hotsite';
import { ImagemProduto } from './ImagemProduto';
import { PaginaBairro } from './PaginaBairro';
import { Planta } from './Planta';

export interface Imagem {
    id: number;
    arquivo: string;
    descricao: string;
    dataCriacao: string;
    dataAtualizacao: string | null;
    ordem: number | null;
    galeriaImagem: GaleriaImagem[];
    hotsite: Hotsite[];
    imagemProdutoBanner: ImagemProduto[];
    imagemProdutoFachada: ImagemProduto[];
    imagemProdutoLogo: ImagemProduto[];
    paginaBairro: PaginaBairro[];
    planta: Planta[];
}