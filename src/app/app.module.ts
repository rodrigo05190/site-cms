import { DragDropModule } from '@angular/cdk/drag-drop';
import { LayoutModule } from '@angular/cdk/layout';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgsgModule } from 'ng-sortgrid';
import { ImageCropperModule } from 'ngx-image-cropper';
import { Interceptor } from './../Interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AreacomumCardComponent } from './areacomum/areacomum-card/areacomum-card.component';
import { AreacomumFichaComponent } from './areacomum/areacomum-ficha/areacomum-ficha.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { BlogCardComponent } from './blog-card/blog-card.component';
import { BooksCardComponent } from './books-card/books-card.component';
import { CardhomePaginaComponent } from './cardhome/cardhome-pagina/cardhome-pagina.component';
import { CentralVendaCardComponent } from './central-venda/central-venda-card/central-venda-card.component';
import { ComodoCardComponent } from './comodo/comodo-card/comodo-card.component';
import { ComodoGridComponent } from './comodo/comodo-grid/comodo-grid.component';
import { ConfiguracaoInterfaceProdutoComponent } from './configuracao-interface-produto/configuracao-interface-produto.component';
import { ConjuntoCardComponent } from './conjunto/conjunto-card/conjunto-card.component';
import { ConjuntoFichaComponent } from './conjunto/conjunto-ficha/conjunto-ficha.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ConjuntoGridComponent } from './conjunto/conjunto-grid/conjunto-grid.component';
import { DashboardCardProdutosPromocaoComponent } from './dashboard/dashboard-card-produtos-promocao/dashboard-card-produtos-promocao.component';
import { DashboardCardTopsComponent } from './dashboard/dashboard-card-tops/dashboard-card-tops.component';
import { DashboardCardUltimosCadastradosComponent } from './dashboard/dashboard-card-ultimos-cadastrados/dashboard-card-ultimos-cadastrados.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DiferencialCardComponent } from './diferencial/diferencial-card/diferencial-card.component';
import { DiferencialFichaComponent } from './diferencial/diferencial-ficha/diferencial-ficha.component';
import { EnderecoCardComponent } from './endereco/endereco-card/endereco-card.component';
import { EnderecoEstandeComponent } from './endereco/endereco-estande/endereco-estande.component'
import { GaleriaCardComponent } from './galeria/galeria-card/galeria-card.component';
import { GaleriaFichaComponent } from './galeria/galeria-ficha/galeria-ficha.component';
import { GaleriaGridComponent } from './galeria/galeria-grid/galeria-grid.component';
import { GaleriaRecordComponent } from './galeria/galeria-record/galeria-record.component';
import { HotsiteFichaComponent } from './hotsite/hotsite-ficha/hotsite-ficha.component';
import { IconeSeletorComponent } from './icone/icone-seletor/icone-seletor.component';
import { ImagemCaseComponent } from './imagem/imagem-case/imagem-case.component';
import { ImagemEditorComponent } from './imagem/imagem-editor/imagem-editor.component';
import { MenuPrincipalComponent } from './menu/menu-principal/menu-principal.component';
import { MenuTopoComponent } from './menu/menu-topo/menu-topo.component';
import { PlantaCardComponent } from './planta/planta-card/planta-card.component';
import { PlantaFichaComponent } from './planta/planta-ficha/planta-ficha.component';
import { PlantaGridComponent } from './planta/planta-grid/planta-grid.component';
import { PlantaVantagemCardComponent } from './planta/planta-vantagem-card/planta-vantagem-card.component';
import { ProdutoCardComponent } from './produto/produto-card/produto-card.component';
import { ProdutoFichaComponent } from './produto/produto-ficha/produto-ficha.component';
import { ProdutoImagemOficialCardComponent } from './produto/produto-imagem-oficial-card/produto-imagem-oficial-card.component';
import { ProdutoListaComponent } from './produto/produto-lista/produto-lista.component';
import { ProdutovideoCardComponent } from './produtovideo/produtovideo-card/produtovideo-card.component';
import { ProdutovideoGridComponent } from './produtovideo/produtovideo-grid/produtovideo-grid.component';
import { ProjetistaCardComponent } from './projetista/projetista-card/projetista-card.component';
import { ProjetistaFichaComponent } from './projetista/projetista-ficha/projetista-ficha.component';
import { CorretorFichaComponent } from './corretor/corretor-ficha/corretor-ficha.component';
import { PromocaoCardComponent } from './promocao/promocao-card/promocao-card.component';
import { PromocaoFichaComponent } from './promocao/promocao-ficha/promocao-ficha.component';
import { PromocaoListaComponent } from './promocao/promocao-lista/promocao-lista.component';
import { RedirectCardComponent } from './redirect/redirect-card/redirect-card.component';
import { RedirectPaginaComponent } from './redirect/redirect-pagina/redirect-pagina.component';
import { RegiaoFichaComponent } from './regiao/regiao-ficha/regiao-ficha.component';
import { SeoLinkCardComponent } from './seo/seo-link-card/seo-link-card.component';
import { SeoLinkGridComponent } from './seo/seo-link-grid/seo-link-grid.component';
import { SeoLinkGridPipe } from './seo/seo-link-grid/seo-link-grid.pipe';
import { SeoLinkPaginaComponent } from './seo/seo-link-pagina/seo-link-pagina.component';
import { SeoProdutoCardComponent } from './seo/seo-produto-card/seo-produto-card.component';
import { StatusobraGridComponent } from './statusobra/statusobra-grid/statusobra-grid.component';
import { CapaExcluirComponent } from './util/capa-excluir/capa-excluir.component';
import { InserirArquivosComponent } from './util/inserir-arquivos/inserir-arquivos.component';
import { DashboardCardQuantidadeConversoesComponent } from './dashboard/dashboard-card-quantidade-conversoes/dashboard-card-quantidade-conversoes.component';
import { CrmGridComponent } from './crm/crm-grid/crm-grid.component';
import { CrmCardComponent } from './crm/crm-card/crm-card.component';


registerLocaleData(localePt, 'pt');


@NgModule({
  declarations: [

    AppComponent,
    MenuPrincipalComponent,
    MenuTopoComponent,
    ProdutoListaComponent,
    DashboardComponent,
    ProdutoCardComponent,
    ProdutoFichaComponent,
    PromocaoCardComponent,
    ProjetistaCardComponent,
    CapaExcluirComponent,
    ImagemCaseComponent,
    CentralVendaCardComponent,
    EnderecoCardComponent,
    EnderecoEstandeComponent,
    GaleriaGridComponent,
    GaleriaCardComponent,
    GaleriaFichaComponent,
    InserirArquivosComponent,
    DiferencialCardComponent,
    DiferencialFichaComponent,
    ConjuntoCardComponent,
    ConjuntoGridComponent,
    AreacomumFichaComponent,
    IconeSeletorComponent,
    AreacomumCardComponent,
    ConjuntoFichaComponent,
    PlantaCardComponent,
    PlantaGridComponent,
    StatusobraGridComponent,
    PlantaFichaComponent,
    ComodoCardComponent,
    ComodoGridComponent,
    LoginComponent,
    SeoLinkGridComponent,
    SeoLinkCardComponent,
    SeoLinkPaginaComponent,
    PromocaoFichaComponent,
    PromocaoListaComponent,
    HotsiteFichaComponent,
    LogoutComponent,
    DashboardCardProdutosPromocaoComponent,
    DashboardCardTopsComponent,
    DashboardCardUltimosCadastradosComponent,
    ImagemEditorComponent,
    SeoProdutoCardComponent,
    ProdutoImagemOficialCardComponent,
    ProjetistaFichaComponent,
    CorretorFichaComponent,
    GaleriaRecordComponent,
    PlantaVantagemCardComponent,
    SeoLinkGridPipe,
    BooksCardComponent,
    RedirectCardComponent,
    RedirectPaginaComponent,
    BlogCardComponent,
    ProdutovideoGridComponent,
    ProdutovideoCardComponent,
    ConfiguracaoInterfaceProdutoComponent,
    CardhomePaginaComponent,
    RegiaoFichaComponent,
    DashboardCardQuantidadeConversoesComponent,
    CrmGridComponent,
    CrmCardComponent
  ],
  imports: [
    MatSlideToggleModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    ImageCropperModule,
    MatButtonToggleModule,
    MatTableModule,
    MatRippleModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    DragDropModule,
    HttpClientModule,
    FormsModule,
    MatTooltipModule,
    MatChipsModule,
    MatSidenavModule,
    BrowserModule,
    AppRoutingModule,
    MatSliderModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatListModule,
    MatTreeModule,
    NgsgModule,
    Interceptor,
    ScrollingModule,
    MatProgressBarModule,
    MatExpansionModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
