import { ConjuntoPlanta } from './ConjuntoPlanta';
import { Conjunto } from './Conjunto';
import { Imagem } from './Imagem';
import { PlantaTipo } from './PlantaTipo';
import { VantagemCompra } from './VantagemCompra';
import { PlantaComodo } from './PlantaComodo';

export interface Planta {
    id: number;
    conjuntoId: number;
    tamanho: number | null;
    descricao: string;
    valor: number | null;
    tipoId: number;
    dataAtualizacao: string | null;
    dataCriacao: string;
    imagemId: number | null;
    tourVirtualId: number | null;
    linkTourVirtual: string;
    conjuntoPlanta: ConjuntoPlanta[];
    imagem: Imagem;
    tipo: PlantaTipo;
    vantagemCompra: VantagemCompra;
    plantaComodo: PlantaComodo[];
}
