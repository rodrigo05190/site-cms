import { ProdutoCrm } from "./ProdutoCrm";

export interface Crm {
  id: number;
  nome: string;
  codigoIdentificacaoPadrao: string;
  dispararSemProdutoInformado: boolean;
  principalRetornoQuandoNaoHouverProdutoInformado: boolean;
  produtoCrm: ProdutoCrm[];
}
