import { Endereco } from './Endereco';
import { CentralVendaProduto } from './CentralVendaProduto';
import { CentralVendaTelefone } from './CentralVendaTelefone';

export interface CentralVenda {
    id: number;
    enderecoId: number;
    nome: string;
    endereco: Endereco;
    centralVendaProduto: CentralVendaProduto[];
    centralVendaTelefone: CentralVendaTelefone[];
}