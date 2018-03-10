import { CartItem } from './cartitem.model';
import { Product } from './product.model';
import { CartService } from './cart.service';
import { ProductService } from './product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  private products:Product[]=[];
  //injecting services
  constructor(private ps:ProductService, private cs:CartService) { }

  ngOnInit() {
    //this.products=this.ps.getProduct();
    this.ps.getProduct().subscribe(
      (data)=>this.products=data,
      (err)=> console.log("Error",err)
    );
  }
  addToCart(sp:Product){
    let item=new CartItem(sp.name,sp.price,1);
    this.cs.addCartItem(item);
  }
  
}
