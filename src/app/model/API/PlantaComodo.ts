import { ComodoTipo } from './ComodoTipo';
import { Planta } from './Planta';

export interface PlantaComodo {
    id: number;
    plantaId: number;
    tipoId: number;
    quantidade: number;
    tamanho: number | null;
    ordem: number | null;
    planta: Planta;
    tipo: ComodoTipo;
}
