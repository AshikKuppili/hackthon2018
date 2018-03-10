import { Product } from './product.model';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ProductService {
  private productsData:Product[]=[];
  requestUrl="http://localhost:3000/wsproducts";
//injecting service
  constructor(private http:HttpClient) {
    //this.productsData=[]
   }
getProduct(){

  //implicit return type of product array
 // return this.productsData;
 return this.http.get<Product[]>(this.requestUrl);
 
}
addProduct(newProduct:Product){
return this.http.post<Product>(this.requestUrl,newProduct);
}
deleteProduct(id:number){
  return this.http.delete(this.requestUrl+"/"+id);
}
updateProduct(product:Product){
  return this.http.put<Product>(this.requestUrl+"/"+product.id,product);
}
}
