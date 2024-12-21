import { CentralVendaTelefone } from './CentralVendaTelefone';
import { Contato } from './Contato';

export interface Telefone {
    id: number;
    ddd: string;
    numero: string;
    dataCriacao: string;
    centralVendaTelefone: CentralVendaTelefone[];
    contato: Contato[];
}