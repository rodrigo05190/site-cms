import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { CardhomePaginaComponent } from './cardhome/cardhome-pagina/cardhome-pagina.component';
import { ConjuntoFichaComponent } from './conjunto/conjunto-ficha/conjunto-ficha.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guard/auth.guard';
import { MenuLoginGuard } from './guard/menu-login.guard';
import { PlantaFichaComponent } from './planta/planta-ficha/planta-ficha.component';
import { ProdutoFichaComponent } from './produto/produto-ficha/produto-ficha.component';
import { ProdutoListaComponent } from './produto/produto-lista/produto-lista.component';
import { PromocaoFichaComponent } from './promocao/promocao-ficha/promocao-ficha.component';
import { PromocaoListaComponent } from './promocao/promocao-lista/promocao-lista.component';
import { RedirectPaginaComponent } from './redirect/redirect-pagina/redirect-pagina.component';
import { RegiaoFichaComponent } from './regiao/regiao-ficha/regiao-ficha.component';
import { SeoLinkPaginaComponent } from './seo/seo-link-pagina/seo-link-pagina.component';


const routes: Routes = [
  { path: 'produto/:produtoId/conjunto/:conjuntoId/planta/novo', component: PlantaFichaComponent , canActivate: [AuthGuard]},
  { path: 'produto/:produtoId/conjunto/:conjuntoId/planta/:plantaId', component: PlantaFichaComponent , canActivate: [AuthGuard]},
  { path: 'produto/:produtoId/conjunto/novo', component: ConjuntoFichaComponent , canActivate: [AuthGuard]},
  { path: 'produto/:produtoId/conjunto/:conjuntoId', component: ConjuntoFichaComponent , canActivate: [AuthGuard]},
  { path: 'produto/novo', component: ProdutoFichaComponent , canActivate: [AuthGuard]},
  { path: 'produto/:produtoId', component: ProdutoFichaComponent , canActivate: [AuthGuard]},
  { path: 'promocao/:promocaoId', component: PromocaoFichaComponent , canActivate: [AuthGuard]},
  { path: 'promocao/novo', component: PromocaoFichaComponent , canActivate: [AuthGuard]},
  { path: 'promocao', component: PromocaoListaComponent , canActivate: [AuthGuard]},
  { path: 'produto', component: ProdutoListaComponent , canActivate: [AuthGuard]},
  { path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard]},
  { path: 'seo', component: SeoLinkPaginaComponent , canActivate: [AuthGuard]},
  { path: 'logout', component: LogoutComponent, canActivate: [MenuLoginGuard], canDeactivate: [MenuLoginGuard] },
  { path: 'login', component: LoginComponent, canActivate: [MenuLoginGuard], canDeactivate: [MenuLoginGuard] },
  { path: 'aplicacao/redirect', component: RedirectPaginaComponent , canActivate: [AuthGuard]},
  { path: 'aplicacao/cardshome', component: CardhomePaginaComponent , canActivate: [AuthGuard]},
  { path: 'regiao', component: RegiaoFichaComponent , canActivate: [AuthGuard]},
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
