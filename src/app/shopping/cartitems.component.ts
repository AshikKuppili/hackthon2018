import { CartItem } from './cartitem.model';
import { CartService } from './cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cartitems',
  templateUrl: './cartitems.component.html',
  styleUrls: ['./cartitems.component.css']
})
export class CartitemsComponent implements OnInit {
  cartitems:CartItem[]=[];
//injecting services
  constructor(private cs:CartService) { }

  ngOnInit() {
    this.cartitems=this.cs.getCartItems();
  }
  totalAmount(){
    let tot=0;
    for(let e of this.cartitems){
      tot=tot+(e.price*e.qty);
    }
    return tot;
  }
  removeCartItem(idx:number){
    this.cs.removeCartItem(idx);
  }

}
