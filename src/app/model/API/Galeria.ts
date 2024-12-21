import { GaleriaTipo } from './GaleriaTipo';
import { GaleriaConjunto } from './GaleriaConjunto';
import { GaleriaImagem } from './GaleriaImagem';
import { GaleriaProduto } from './GaleriaProduto';

export interface Galeria {
    id: number;
    titulo: string;
    tipoId: number;
    dataCriacao: string;
    dataAtualizacao: string | null;
    tipo: GaleriaTipo;
    galeriaConjunto: GaleriaConjunto[];
    galeriaImagem: GaleriaImagem[];
    galeriaProduto: GaleriaProduto[];
}