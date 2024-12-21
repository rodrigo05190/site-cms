import { Conjunto } from './Conjunto';
import { Produto } from './Produto';
import { StatusObraTipo } from './StatusObraTipo';

export interface StatusObra {
    id: number;
    dataCriacao: string;
    dataAtualizacao: string | null;
    conjunto: Conjunto[];
    produto: Produto[];
    statusObraTipo: StatusObraTipo[];
}