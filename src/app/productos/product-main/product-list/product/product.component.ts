import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/productos/Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;
  @Input() monitoreo: boolean;
  @Output() selected = new EventEmitter();
  @Output() checkValue = new EventEmitter();
  @Output() toDelete = new EventEmitter();

  mostrarProduct = true;

  constructor() { }

  ngOnInit(): void {
  }

  productIsSelected() {
    this.selected.emit(this.product);
  }

  valueToSend(value) {
    console.log(value);
    this.checkValue.emit(value);
  }

  productToDelete() {
    this.toDelete.emit(this.product);
  }

}
