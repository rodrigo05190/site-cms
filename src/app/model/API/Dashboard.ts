export interface RelatorioContatoDestino {
  destinoId: number;
  destino: string;
  quantidade: number;
  origem: IdentificadorQuantidade[];
  produto: IdentificadorQuantidade[];
}

export interface IdentificadorQuantidade {
  id: number | null;
  nome: string;
  quantidade: number;
}
