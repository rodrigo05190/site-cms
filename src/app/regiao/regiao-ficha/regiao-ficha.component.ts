import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Bairro } from 'src/app/model/API/Bairro';
import { Estado } from 'src/app/model/API/Estado';
import { Pais } from 'src/app/model/API/Pais';
import { Cidade } from './../../model/API/Cidade';
import { BairroService } from './../../service/bairro.service';
import { CidadeService } from './../../service/cidade.service';
import { EstadoService } from './../../service/estado.service';
import { PaisService } from './../../service/pais.service';

@Component({
  selector: 'app-regiao-ficha',
  templateUrl: './regiao-ficha.component.html',
  styleUrls: ['./regiao-ficha.component.css']
})
export class RegiaoFichaComponent implements OnInit {

  constructor(
    private paisService: PaisService,
    private estadoService: EstadoService,
    private cidadeService: CidadeService,
    private bairroService: BairroService
  ) { }

  ngOnInit(): void {
  }

  estados(paisId: number) {
    console.log("request estados:", paisId);
    return this.estadoService.getAll().pipe(
      map(listaCompleta => {
        return listaCompleta.filter(estado => estado.paisId == paisId)
      })
    )
  }

  cidades(estadoId: number) {
    console.log("request cidades:", estadoId);
    return this.cidadeService.getAll().pipe(
      map(listaCompleta => {
        return listaCompleta.filter(estado => estado.estadoId == estadoId)
      })
    )
  }

  bairros(cidadeId: number) {
    console.log("request bairros:", cidadeId);
    return this.bairroService.getAll().pipe(
      map(listaCompleta => {
        return listaCompleta.filter(estado => estado.cidadeId == cidadeId)
      })
    )
  }

  paises() {
    console.log("request paises");
    return this.paisService.getAll();
  }


  adicionarPais() {
    var nome = prompt(`Inserindo novo país\n\nInforme o nome do pais:`);
    if (!nome) return;
    var sigla = prompt(`Inserindo novo pais ${nome} \n\n Informe a sigla UF do pais ${nome}: `);
    if (!sigla) return;

    const pais: any = {
      nome: nome,
      sigla: sigla
    }

    this.paisService.post(pais).subscribe(sucesso => {
      alert(`Pais ${sucesso.nome} inserido com sucesso.`)
    });
  }

  adicionarEstado(pais: Pais) {
    var nome = prompt(`Inserindo novo estado no pais ${pais.nome} - ${pais.sigla} \n\nInforme o nome do estado:`);
    if (!nome) return;
    var ufEstado = prompt(`Inserindo novo estado no pais ${pais.nome} - ${pais.sigla} \n\n Informe a sigla UF do estado de ${nome}: `);
    if (!ufEstado) return;

    const estado: any = {
      nome: nome,
      uf: ufEstado,
      paisId: pais.id
    }

    this.estadoService.post(estado).subscribe(sucesso => {
      alert(`Estado ${sucesso.nome} inserido com sucesso no pais ${pais.nome}.`)
    });
  }


  adicionarCidade(estado: Estado) {
    var nome = prompt(`Inserindo nova cidade no estado ${estado.nome} - ${estado.uf} \n\nInforme o nome da cidade:`);
    if (!nome) return;

    const cidade: any = {
      nome: nome,
      estadoId: estado.id
    }

    this.cidadeService.post(cidade).subscribe(sucesso => {
      alert(`Cidade ${sucesso.nome} inserida com sucesso no estado ${estado.nome} - ${estado.uf}.`)
    });
  }


  adicionarBairro(cidade: Cidade) {
    var nome = prompt(`Inserindo novo bairro na cidade ${cidade.nome} \n\nInforme o nome do bairro:`);
    if (!nome) return;

    const bairro: any = {
      nome: nome,
      cidadeId: cidade.id
    }

    this.bairroService.post(bairro).subscribe(sucesso => {
      alert(`Bairro ${sucesso.nome} inserido com sucesso na cidade ${cidade.nome}.`)
    });
  }


  alterarBairro(cidade: Cidade, bairro: Bairro) {
    var nome = prompt(`Alterando o bairro ${bairro.nome} da cidade ${cidade.nome}. \n\nInforme um novo nome para esse bairro:`, bairro.nome);
    if (!nome) return;

    if (!confirm(`ATENÇÃO: Essa alteração refletirá nos endereços e produtos que esse bairro estiver selecionado.\n\n
    Deseja realmente alterar o nome do bairro ${bairro.nome} para ${nome} ?`
    )) return;

    bairro.nome = nome;
    this.bairroService.put(bairro).subscribe(sucesso => {
      alert(`Bairro ${sucesso.nome} alterado com sucesso na cidade ${cidade.nome}.`)
    });
  }


  alterarCidade(estado: Estado, cidade: Cidade) {
    var nome = prompt(`Alterando a cidade ${cidade.nome} do estado ${estado.nome}. \n\nInforme um novo nome para essa cidade:`, cidade.nome);
    if (!nome) return;

    if (!confirm(`ATENÇÃO: Essa alteração refletirá nos endereços e produtos que essa cidade estiver selecionada.\n\n
    Deseja realmente alterar o nome da cidade ${cidade.nome} para ${nome} ?`
    )) return;

    cidade.nome = nome;
    this.cidadeService.put(cidade).subscribe(sucesso => {
      alert(`Cidade ${sucesso.nome} alterada com sucesso no estado ${estado.nome} - ${estado.uf}.`)
    });
  }


  alterarEstado(pais: Pais, estado: Estado) {
    var nome = prompt(`Alterando o estado ${estado.nome} do pais ${pais.nome} - ${pais.sigla}. \n\nInforme um novo nome para esse estado:`, estado.nome);
    if (!nome) return;
    var uf = prompt(`Alterando o estado ${estado.nome} do pais ${pais.nome} - ${pais.sigla}. \n\nInforme uma nova sigla UF nome para esse estado:`, estado.uf);
    if (!uf) return;

    if (!confirm(`ATENÇÃO: Essa alteração refletirá nos endereços e produtos que esse estado estiver selecionado.\n\n`
      + estado.nome != nome ? `Deseja realmente alterar o nome do estado ${estado.nome} para ${nome}?` : ''
        + estado.uf != uf ? `Deseja realmente alterar a sigla UF atual do estado ${estado.uf} para ${uf}?` : ''
    )) return;

    estado.nome = nome;
    estado.uf = uf;
    this.estadoService.put(estado).subscribe(sucesso => {
      alert(`Estado ${sucesso.nome} alterado com sucesso no país ${pais.nome} - ${pais.sigla}.`)
    });
  }


  alterarPais(pais: Pais) {
    var nome = prompt(`Alterando o pais ${pais.nome} - ${pais.sigla}. \n\nInforme um novo nome para esse país:`, pais.nome);
    if (!nome) return;
    var sigla = prompt(`Alterando o país ${pais.nome} - ${pais.sigla}. \n\nInforme uma nova sigla nome para esse país:`, pais.sigla);
    if (!sigla) return;

    if (!confirm(`ATENÇÃO: Essa alteração refletirá nos endereços e produtos que esse país estiver selecionado.\n\n`
      + pais.nome != nome ? `Deseja realmente alterar o nome do país ${pais.nome} para ${nome}?` : ''
        + pais.sigla != sigla ? `Deseja realmente alterar a sigla atual do pais ${pais.sigla} para ${sigla}?` : ''
    )) return;

    pais.nome = nome;
    pais.sigla = sigla;
    this.paisService.put(pais).subscribe(sucesso => {
      alert(`Pais ${sucesso.nome} - ${sucesso.sigla} alterado com sucesso.`)
    });
  }


  excluirPais(pais: Pais) {
    if (!confirm(`ATENÇÃO: Excluir esse país também removerá todos estados, cidades e bairros dentro deste país.\n\nDeseja continuar?`)) return;

    var nome = prompt(`Excluindo o pais ${pais.nome} - ${pais.sigla}. \n\nPara continuar com a exclusão dessa localidade escreva: "eu quero excluir" no campo abaixo:`);
    if (nome.toLocaleLowerCase() != "eu quero excluir") return;

    this.paisService.delete(pais).subscribe(sucesso => {
      alert(`Pais ${pais.nome} - ${pais.sigla} excluído com sucesso.`)
    });
  }

  excluirEstado(estado: Estado) {
    if (!confirm(`ATENÇÃO: Excluir esse estado também removerá todas cidades e bairros dentro deste estado.\n\nDeseja continuar?`)) return;

    var nome = prompt(`Excluindo o estado ${estado.nome} - ${estado.uf}. \n\nPara continuar com a exclusão dessa localidade escreva: "eu quero excluir" no campo abaixo:`);
    if (nome.toLocaleLowerCase() != "eu quero excluir") return;

    this.estadoService.delete(estado).subscribe(sucesso => {
      alert(`Estado ${estado.nome} - ${estado.uf} excluído com sucesso.`)
    });
  }

  excluirCidade(cidade: Cidade) {
    if (!confirm(`ATENÇÃO: Excluir essa cidade também removerá todos e bairros dentro deste cidade.\n\nDeseja continuar?`)) return;

    var nome = prompt(`Excluindo o cidade ${cidade.nome}. \n\nPara continuar com a exclusão dessa localidade escreva: "eu quero excluir" no campo abaixo:`);
    if (nome.toLocaleLowerCase() != "eu quero excluir") return;

    this.cidadeService.delete(cidade).subscribe(sucesso => {
      alert(`Cidade ${cidade.nome} excluído com sucesso.`)
    });
  }

  excluirBairro(bairro: Bairro) {
    if (!confirm(`ATENÇÃO: Excluir essa bairro também removerá todos ENDEREÇOS dentro deste bairro.\n\nDeseja continuar?`)) return;

    var nome = prompt(`Excluindo o bairro ${bairro.nome}. \n\nPara continuar com a exclusão dessa localidade escreva: "eu quero excluir" no campo abaixo:`);
    if (nome.toLocaleLowerCase() != "eu quero excluir") return;

    this.bairroService.delete(bairro).subscribe(sucesso => {
      alert(`Bairro ${bairro.nome} excluído com sucesso.`)
    });
  }

}
