import { MenuService } from './../../service/menu.service';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { delay, take, map, takeUntil, takeWhile } from 'rxjs/operators';
import { interval, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit, OnDestroy {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  @HostBinding('class') classes = 'pagina';

  timer: Subscription;

  segundos = 5;

  ngOnInit(): void {

    this.timer = interval(1000).pipe(
      takeWhile(x => this.segundos > 0)
    ).subscribe(
      tempo => {
        this.segundos--;
        if (this.segundos === 0) {
          this.authService.sair();
          this.router.navigate(['login']);
        }
      }
    );


  }

  ngOnDestroy(): void {
    this.timer?.unsubscribe();
  }

}
