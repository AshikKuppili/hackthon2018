import { CartService } from './cart.service';
import { ProductService } from './product.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { CartitemsComponent } from './cartitems.component';
import { ListComponent } from './list.component';
import { ManageComponent } from './manage.component';
import {TableModule} from 'primeng/table';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,TableModule,FormsModule,HttpClientModule,RouterModule.forChild([
      {path:"list",component: ListComponent},
      {path:"manage",component: ManageComponent}
    ])
  ],
  declarations: [ProductsComponent, CartitemsComponent, ListComponent, ManageComponent],
  //register service
  providers:[ProductService,CartService]
})
export class ShoppingModule { }
