import { Produto } from './Produto';

export interface Corretor {
    id: number;
    areaPrivativa : string;
    quantidadeDeSuites : string;
    quantidadeDeDormitorio : string;
    quantidadeDeBanheiros : string;
    quantidadeDeVaga : string;
    quantidadeDeApPorAndar : string;
    numeroDeTorres : string;
    numeroTotalDeUnidades : string;
    tamanhoTerreno : string;
    numeroDeposito : string;
    banheirosMin: number;
    banheirosMax: number;
    vagasMin: number;
    vagasMax: number;
    suitesMin: number;
    suitesMax: number;
    dormitoriosMax: number;
    dormitoriosMin: number;
    areaMin: number;
    areaMax: number;
    depositoPrivativo:  boolean | null;
    produto: Produto[];
}