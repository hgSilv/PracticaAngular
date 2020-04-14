import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeaderComponent } from './header.component';
import { HomeComponent } from './home.component';
import { NotFoundComponent } from './not-found.component';
import { ProductMainComponent } from './productos/product-main/product-main.component';
import { ProductListComponent } from './productos/product-main/product-list/product-list.component';
import { ProductDetailComponent } from './productos/product-main/product-detail.component';
import { ProductEditComponent } from './productos/product-main/product-edit.component';
import { componentFactoryName } from '@angular/compiler';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'monitoreo', component: ProductMainComponent, children: [
    {path: '', component: ProductListComponent, pathMatch: 'full'}
  ]},
  {path: 'products', component: ProductMainComponent, children: [
    {path: '', component: ProductListComponent, pathMatch: 'full'},
    {path: 'new', component: ProductEditComponent},
    {path: ':id', component: ProductDetailComponent},
    {path: ':id/edit', component: ProductEditComponent}
  ]},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
