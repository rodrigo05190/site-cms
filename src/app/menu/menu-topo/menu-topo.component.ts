import { AuthService } from './../../service/auth.service';
import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-menu-topo',
  templateUrl: './menu-topo.component.html',
  styleUrls: ['./menu-topo.component.css']
})
export class MenuTopoComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) { }

  @HostBinding('class') classes = 'sombra-2';

  ngOnInit(): void {
  }

}
