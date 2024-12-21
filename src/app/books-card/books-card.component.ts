import { Component, OnInit, Input } from '@angular/core';
import { Books } from '../model/API/Books';
import { BooksService } from '../service/books.service';

@Component({
  selector: 'app-books-card',
  templateUrl: './books-card.component.html',
  styleUrls: ['./books-card.component.css']
})
export class BooksCardComponent implements OnInit {

  books: Books = {} as Books;
  bookExiste = false;
  @Input() produtoId: number;


  constructor(private booksService: BooksService) { }

  ngOnInit(): void {
    this.booksService.get(this.produtoId).subscribe(sucesso => {
      this.books = sucesso;
      this.bookExiste = true;
    })
  }


  salvar() {
    if (!this.books.link) {
      this.books.link;
    }

    if (this.bookExiste) {
      this.booksService.delete(this.books).subscribe(sucesso => {
        this.books.produtoId = this.produtoId;
        this.booksService.post(this.books).subscribe(sucesso2 => {
          console.log(sucesso2);
          this.books = sucesso2;
          this.books.link = sucesso2.link;
          this.bookExiste = true;
        });
      });
    } else {

      this.books.produtoId = this.produtoId;
      this.booksService.post(this.books).subscribe(sucesso => {
        this.books = sucesso;
        this.books.link = sucesso.link;
        this.bookExiste = true;
      });
    }
  }

  excluir() {
    if (this.books) {

      this.booksService.delete(this.books).subscribe(sucesso => {
        this.books = {} as Books;
        this.bookExiste = false;
      });
    }
  }
}
