import { DiferencialTipo } from './DiferencialTipo';
import { DiferencialProduto } from './DiferencialProduto';

export interface Diferencial {
    id: number;
    texto: string;
    tipoId: number;
    tipo: DiferencialTipo;
    diferencialProduto: DiferencialProduto[];
}