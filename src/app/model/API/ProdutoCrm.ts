import { Crm } from "./crm";
import { Produto } from "./Produto";

export interface ProdutoCrm {
  produtoId: number;
  crmid: number;
  principal: boolean | null;
  codigo: string;
}
