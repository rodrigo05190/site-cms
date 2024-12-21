import { ObraTipo } from './ObraTipo';
import { StatusObra } from './StatusObra';

export interface StatusObraTipo {
    statusObraId: number;
    obraTipoId: number;
    progresso: number | null;
    id: number;
    obraTipo: ObraTipo;
    statusObra: StatusObra;
}