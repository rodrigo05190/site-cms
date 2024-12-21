import { CentralVenda } from './CentralVenda';
import { Telefone } from './Telefone';

export interface CentralVendaTelefone {
    centralVendaId: number;
    telefoneId: number;
    id: number;
    centralVenda: CentralVenda;
    telefone: Telefone;
}