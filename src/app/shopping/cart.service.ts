import { CartItem } from './cartitem.model';
import { Injectable } from '@angular/core';

@Injectable()
export class CartService {
private cartData:CartItem[]=[];
  private count:number=1;
  private status:boolean=false;
  constructor() { }
  //etrieve item
getCartItems(){
  return this.cartData;
}
//add item
addCartItem(newitem:CartItem){
  if(this.count==1){
    this.cartData.push(newitem);
  }
  for(let i of this.cartData){
    this.status=false;
    if(newitem.name==i.name){
      if(this.count!=1){
      i.qty=(i.qty+newitem.qty);
      }
     this.status=true;
     break;
    }
  }
this.count++; 
if(this.status==false){
  this.cartData.push(newitem);
}
}
//remove item
removeCartItem(idx:number){
this.cartData.splice(idx,1);
}
}
