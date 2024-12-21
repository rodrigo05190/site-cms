import { Galeria } from './Galeria';
import { Imagem } from './Imagem';

export interface GaleriaImagem {
    galeriaId: number;
    imagemId: number;
    ordem: number | null;
    galeria: Galeria;
    imagem: Imagem;
}