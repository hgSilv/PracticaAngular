import { Injectable } from '@angular/core';
import { Product } from './Product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
newProduct: Product;
productList: Product[];
monitoreoList: Product[];
productSubject = new BehaviorSubject <Product[]>([]);

  constructor() { 
    this.productList = [new Product(12,"Smartphone", "Apple", "Quadcore 3GHZ", 35599.9, 3, []),
                      new Product(123,"Smartphone", "Samsung", "Quadcore 3GHZ", 21299.5, 8, []),
                      new Product(11,"Smartphone", "Xiaomi", "Quadcore 3GHZ", 10018.5, 10, []),
                      new Product(142,"Smartphone", "Huawei", "Quadcore 3GHZ", 12108.5, 5, []),
                      new Product(145,"Smartphone", "Sony", "Quadcore 3GHZ", 7108.5, 20, []),
                      new Product(198,"Smartwatch","Sony", "3gb Ram", 4999.9, 0, []),
                      new Product(19,"Consola","Sony", "3gb Ram", 4999.9, 0, []),
                      new Product(134,"PC","Lenovo", "i7, 12 RAM", 24999.9, 4, []),
                      new Product(9,"PC","Asus", "i5, 8 RAM", 18999.9, 0, []),
                      new Product(78,"SmartTV", "Sony", "52 pulgadas", 8999.9, 3, [])]
  this.monitoreoList = [];
  this.productSubject.next(this.getProducts());
  }

  getProducts(): Product[] {
    return this.productList.slice();
  }

  getProduct(key): Product { 
    return this.productList.find(obj => obj.uid == key);
  }

  createProduct(uid, nombre, marca, descripcion, precio, existencia, specs): void {
    this.newProduct = new Product(uid, nombre, marca, descripcion, precio, existencia, specs);
    this.productList.push(this.newProduct);
  }

  deleteProduct(product): void {
    let indexFound = this.productList.indexOf(product);
    this.productList.splice(indexFound, 1);
  }

  editProduct(uid, nombre, marca, descripcion, precio, existencia, specs): void { 
    let indexFound = this.productList.indexOf(this.productList.find(obj=> obj.uid == uid));
    this.productList.splice(indexFound, 1, new Product(uid, nombre, marca, descripcion, precio, existencia, specs));
  }

  getMonitoreo() {
    return this.monitoreoList.slice();
  }

  pushMonitoreo(product) {
    this.monitoreoList.push(product);
  }

  deleteFromMonitoreo(product) {
    let indexFound = this.monitoreoList.indexOf(product);
    this.monitoreoList.splice(indexFound, 1);
  }


}
