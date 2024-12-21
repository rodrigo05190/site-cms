import { environment } from 'src/environments/environment';
import { HotsiteService } from './../../service/hotsite.service';
import { Hotsite } from './../../model/API/Hotsite';
import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-hotsite-ficha',
  templateUrl: './hotsite-ficha.component.html',
  styleUrls: ['./hotsite-ficha.component.css']
})
export class HotsiteFichaComponent implements OnInit {

  constructor(
    private hotsiteService: HotsiteService,
    private fb: FormBuilder

  ) { }

  @HostBinding('class') classes = 'br5 ';

  @Input() produtoId: number;

  environment = environment;

  hotsite: Hotsite = {} as Hotsite;

  form: FormGroup;
  jaExiste;

  ngOnInit(): void {

    this.form = this.fb.group({
      produtoId: [{ value: this.produtoId }, [Validators.required]],
      imagemId: [{ value: this.hotsite.imagemId }, [Validators.required]],
      texto: [{ value: this.hotsite.texto }, [Validators.required]],
      url: [{ value: this.hotsite.url }, [Validators.required]],
    });

    this.hotsiteService.get(this.produtoId).subscribe(sucesso => {
      this.hotsite = sucesso;
      this.jaExiste = true;
    });
  }


  salvar() {

    if (!this.jaExiste) {
      this.hotsiteService.post(this.form.value).subscribe(sucesso => {
        this.hotsite = sucesso;
        this.jaExiste = true;
      });
    } else {
      this.hotsiteService.put(this.form.value).subscribe(sucesso => {
        this.hotsite = sucesso;
        this.jaExiste = true;
      });
    }
  }

  excluir() {
    this.hotsiteService.delete(this.hotsite).subscribe(sucesso => {
      this.hotsite = {} as Hotsite;
      this.jaExiste = false;
    });
  }

}
