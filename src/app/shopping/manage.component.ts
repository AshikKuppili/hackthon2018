import { CartService } from './cart.service';
import { ProductService } from './product.service';
import { Product } from './product.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  private products:Product[]=[];
  frmProduct:Product=new Product(null,null,null,null);
  //injecting service:product
  constructor(private ps:ProductService) { }

  ngOnInit() {
    //this.products=this.ps.getProduct();
    this.ps.getProduct().subscribe(
      (data)=>this.products=data,
      (err)=> console.log("Error",err)
    );
  }
add(){
  this.ps.addProduct(this.frmProduct).subscribe(
    (data)=>{
      console.log("Add success");
      this.products.push(data);
    },(err)=>{
      console.log("Add error");
    }

  )
  this.frmProduct=new Product(null,null,null,null);
}
update(selectedProduct:Product){
 // this.frmProduct=selectedProduct;
 Object.assign(this.frmProduct,selectedProduct);
}
edit(){
  this.ps.updateProduct(this.frmProduct).subscribe(
    (data)=>{
        console.log("update success");
         //array function find index
    let idx=this.products.findIndex((e)=> e.id==this.frmProduct.id);
    this.products[idx]=data;
      },(err)=>{
        console.log("update error");
      }
    );
 }
delete(id:number){
this.ps.deleteProduct(id).subscribe(

  (data)=>{
    console.log("Delete success");
    //array function find index
    let idx=this.products.findIndex((e)=> e.id==id);
    this.products.splice(idx,1);
    
  },(err)=>{
    console.log("Delete error");
  }
);
}
}
