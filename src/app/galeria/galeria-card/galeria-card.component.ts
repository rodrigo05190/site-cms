import { GaleriaService } from './../../service/galeria.service';
import { GaleriaTipoService } from './../../service/galeriaTipo.service';
import { GaleriaTipo } from './../../model/API/GaleriaTipo';
import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { Galeria } from 'src/app/model/API/Galeria';

@Component({
  selector: 'app-galeria-card',
  templateUrl: './galeria-card.component.html',
  styleUrls: ['./galeria-card.component.css']
})
export class GaleriaCardComponent implements OnInit {

  constructor(
    private galeriaTipoService: GaleriaTipoService,
    private galeriaService: GaleriaService,

  ) { }

  @HostBinding('class') classes = 'br5 ma8 pa8';

  @Input() galeria: Galeria;

  ngOnInit(): void {
    // console.log('')


  }

}
