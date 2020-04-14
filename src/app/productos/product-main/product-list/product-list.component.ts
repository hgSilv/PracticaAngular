import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../products.service';
import { Product } from '../../Product';
import { ThrowStmt } from '@angular/compiler';
import { Router } from '@angular/router';
import { createNgModule } from '@angular/compiler/src/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productList: Product[];
  respBusqueda: Product[];
  monitoreoList: Product[];
  selectedList: Product[];
  busqueda = '';
  onMonitoreo = false;
  indexToSearch: number;
  productToMonitor: Product;
  currValue: boolean;

  constructor(private productService: ProductsService, private router: Router) {
    this.productList = productService.getProducts();
    this.respBusqueda = this.productList.slice();
    this.monitoreoList = productService.getMonitoreo();
    this.selectedList = [];

  }

  findProduct(): void {
    if (!this.onMonitoreo) {
      this.respBusqueda = this.productList.filter(obj => obj.nombre
        .toUpperCase().includes(this.busqueda.toUpperCase())
        || obj.marca.toUpperCase().includes(this.busqueda.toUpperCase())
        || obj.descripcion.toUpperCase().includes(this.busqueda.toUpperCase())
      );
    } else {
      this.respBusqueda = this.monitoreoList.filter(obj => obj.nombre
        .toUpperCase().includes(this.busqueda.toUpperCase())
        || obj.marca.toUpperCase().includes(this.busqueda.toUpperCase())
        || obj.descripcion.toUpperCase().includes(this.busqueda.toUpperCase())
      );
    }
  }

  isMonitoreo(): boolean {
    if (this.router.url == '/monitoreo') {
      this.onMonitoreo = true;
      this.respBusqueda = this.monitoreoList;
    } else {
      this.onMonitoreo = false;
      this.respBusqueda = this.productList;
    }
    return this.onMonitoreo;
  }

  selectedProduct(product) {
    console.log(product);
    if (!this.currValue) {
      this.selectedList.splice(this.selectedList.indexOf(product), 1);
    }
    if (this.currValue) {
      this.selectedList.push(product);
    }
    console.log(this.selectedList);
  }

  checkboxValue(value) {
    console.log(value);
    this.currValue = value;
  }

  addToMonitoreo(): Product[] {

    this.selectedList.map((product) => {
      if (!this.monitoreoList.includes(product)) {
        this.productService.pushMonitoreo(product);
        this.monitoreoList = this.productService.getMonitoreo();
      }
    });
    console.log(this.monitoreoList);
    return this.monitoreoList.slice();
  }

  deleteFrom(product) {
    console.log(product);
    if (this.onMonitoreo) {
      this.productService.deleteFromMonitoreo(product);
      this.monitoreoList = this.productService.getMonitoreo();
      console.log(this.monitoreoList);
      console.log(this.productService.getMonitoreo());
    } else {
      this.productService.deleteProduct(product);
      this.productList = this.productService.getProducts();
      console.log(this.productList);
      console.log(this.productService.getProducts());
      if (this.monitoreoList.includes(product)) {
        this.productService.deleteFromMonitoreo(product);
        this.monitoreoList = this.productService.getMonitoreo();
      }
    }
  }

  ngOnInit(): void {
  }

}
