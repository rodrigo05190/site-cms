import { StatusObraTipo } from './StatusObraTipo';

export interface ObraTipo {
    id: number;
    nome: string;
    statusObraTipo: StatusObraTipo[];
}