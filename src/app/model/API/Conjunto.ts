import { ConjuntoPlanta } from './ConjuntoPlanta';
import { DiferencialConjunto } from './DiferencialConjunto';
import { Endereco } from './Endereco';
import { GaleriaConjunto } from './GaleriaConjunto';
import { Produto } from './Produto';
import { StatusConjunto } from './StatusConjunto';
import { StatusObra } from './StatusObra';

export interface Conjunto {
  id: number;
  nome: string;
  pavimentos: number | null;
  elevadores: number | null;
  unidadesPorPavimento: string;
  statusConjuntoId: number | null;
  produtoId: number;
  dataCriacao: string;
  dataAtualizacao: string | null;
  enderecoId: number | null;
  statusObraId: number | null;
  evolucaoObraId: number | null;
  endereco: Endereco;
  produto: Produto;
  statusConjunto: StatusConjunto;
  statusObra: StatusObra;
  diferencialConjunto: DiferencialConjunto[];
  galeriaConjunto: GaleriaConjunto[];
  conjuntoPlanta: ConjuntoPlanta[];
  vistaPorAndarUrl: string | null;
}
