import { Planta } from './Planta';

export interface VantagemCompra {
    plantaId: number;
    fgts: boolean;
    escrituraGratis: boolean;
    itbigratis: boolean;
    minhaCasaMinhaVida: boolean;
    subsidio: number;
    planta: Planta;
}