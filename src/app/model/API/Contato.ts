import { OrigemContato } from './OrigemContato';
import { Produto } from './Produto';
import { Telefone } from './Telefone';

export interface Contato {
    id: number;
    nome: string;
    email: string;
    telefoneId: number | null;
    chatId: string;
    midia: string;
    produtoId: number | null;
    origemContatoId: number | null;
    mensagem: string;
    dataCriacao: string;
    origemContato: OrigemContato;
    produto: Produto;
    telefone: Telefone;
}