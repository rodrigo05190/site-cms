import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CorretorService } from 'src/app/service/corretor.service';
import { Corretor } from 'src/app/model/API/Corretor';
import { zip } from 'rxjs';

@Component({
  selector: 'app-corretor-ficha',
  templateUrl: './corretor-ficha.component.html',
  styleUrls: ['./corretor-ficha.component.css']
})
export class CorretorFichaComponent implements OnInit {

  constructor(
    private corretorService: CorretorService,
  
  ) { }

  @Input() corretorId: number;

  corretor: Corretor = {} as Corretor;
  

  @Output() salvo = new EventEmitter<number | null>();

  ngOnInit(): void {
    this.corretorService.get(this.corretorId).subscribe(
      sucesso => {
        this.corretor = sucesso;
      }
    )

  }

  salvar() {
  
    if (this.corretor?.id) {
      this.corretorService.put(this.corretor).subscribe(sucesso => this.corretor = sucesso)
        .add(() => { this.salvo.emit(this.corretor.id); });
    } else {
      this.corretorService.post(this.corretor).subscribe(sucesso => this.corretor = sucesso)
        .add(() => { this.salvo.emit(this.corretor.id); });
    }
  }
}
