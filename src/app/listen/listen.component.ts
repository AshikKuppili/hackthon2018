import { CartItem } from './../shopping/cartitem.model';
import { Product } from './../shopping/product.model';
// src/app/listen/listen.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SpeechService } from './../speech.service';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { Words } from './../words';


@Component({
  selector: 'app-listen',
  templateUrl: './listen.component.html',
  styleUrls: ['./listen.component.scss']
})
export class ListenComponent implements OnInit, OnDestroy {
  private count:number=1;
  nouns: string[] = new Words().array;
  verbs: string[] = new Words().array;
  adjs: string[] = new Words().array;
  mobiles: string[] = new Words().array;
  cartItems: Product[] =[];
  dummyProducts: Product[] =[];
  go: string[] = new Words().array;
  remove: string[] = new Words().array;
  update: string[] = new Words().array;
  help: string[] = new Words().array;
  name: string[] = new Words().array;
  
  arrayFull: string;
  nounSub: Subscription;
  verbSub: Subscription;
  adjSub: Subscription;
  errorsSub: Subscription;
  errorMsg: string;
  mobileSub: Subscription;
  productName:string;
  goSub: Subscription;
  removeSub: Subscription;
  updateSub: Subscription;
  helpSub: Subscription;
  buttonAction:string;
  nameSub: Subscription;
  userName:string;

  dummyDataCount:number=1;
  constructor(public speech: SpeechService) { 
    //speech
    var utterance = new SpeechSynthesisUtterance('Hey there, welcome to Colruyt, please tell your name, so I can remember you');
    window.speechSynthesis.speak(utterance);
    
  }

  ngOnInit() {
    this.feedData();
    this.speech.init();
    this._listenNouns();
    this._listenVerbs();
    this._listenAdj();
    this._listenErrors();
    this._listenMobiles();
    this._listenGo();
    this._listenUpdate();
    this._listenRemove();
    this._listenHelp();
    this._listenName();
  }

  get btnLabel(): string {
    return this.speech.listening ? 'Listening...' : 'Listen';
  }

  private _listenNouns() {
    this.nounSub = this.speech.words$
      .filter(obj => obj.type === 'noun')
      .map(nounObj => nounObj.word)
      .subscribe(
        noun => {
          this.nouns = this._updateWords('nouns', this.nouns, noun);
          this._setError();
          console.log('noun:', noun);
        }
      );
  }

  private _listenVerbs() {
    this.verbSub = this.speech.words$
      .filter(obj => obj.type === 'verb')
      .map(verbObj => verbObj.word)
      .subscribe(
        verb => {
          this.verbs = this._updateWords('verbs', this.verbs, verb);
          this._setError();
          console.log('verb:', verb);
        }
      );
  }

  private _listenAdj() {
    this.adjSub = this.speech.words$
      .filter(obj => obj.type === 'adj')
      .map(adjObj => adjObj.word)
      .subscribe(
        adj => {
          this.adjs = this._updateWords('adjectives', this.adjs, adj);
          this._setError();
          console.log('adjective:', adj);
        }
      );
  }

  private _listenMobiles() {
    this.mobileSub = this.speech.words$
      .filter(obj => obj.type === 'mobile')
      .map(mobileObj => mobileObj.word)
      .subscribe(
        mobile => {
          this.productName=mobile.toString();
          this.mobiles = this._updateWords('mobiles', this.mobiles, mobile);
          this._setError();
          console.log('mobile:::', this.productName);
        }
      );
  }
  private _updateWords(type: string, arr: string[], newWord: string) {
    const _checkArrayFull = arr.every(item => !!item === true);

    if (_checkArrayFull) {
      this.arrayFull = type;
      return arr;
    } else {
      let _added = false;
      this.arrayFull = null;
      return arr.map(item => {
        if (!item && !_added) {
          _added = true;
          //adding to cart
          console.log('adding to cartlist....................type::'+type);
          if("mobiles"==type){
          this.prepareCartList();
        }
        if("remove"==type){
          this.removeCartItem(newWord);
        }
        if("update"==type){
          this.prepareCartList();
        }
        if("go"==type){
          this.prepareCartList();
        }
        if("help"==type){
          console.log('help........');
          
          this.handleChatBot();
        }
        console.log('name........type'+type);
        if("name"==type){
          console.log('name........'+type);
          //speech
          var utterance = new SpeechSynthesisUtterance('Wel come'+this.userName);
          window.speechSynthesis.speak(utterance);
        }
          return newWord;
        } else {
          return item;
        }
        });
    }
  }
  private _listenGo() {
    this.goSub = this.speech.words$
      .filter(obj => obj.type === 'go')
      .map(goObj => goObj.word)
      .subscribe(
        go => {
          this.go = this._updateWords('go', this.go, go);
          this._setError();
          console.log('invoke go:::');
        }
      );
  }
  private _listenRemove() {
    this.removeSub = this.speech.words$
      .filter(obj => obj.type === 'remove')
      .map(removeObj => removeObj.word)
      .subscribe(
        remove => {
          this.remove = this._updateWords('remove', this.remove, remove);
          this._setError();
          console.log('invoke remove:::');
        }
      );
  }
  private _listenName() {
    this.nameSub = this.speech.words$
      .filter(obj => obj.type === 'name')
      .map(nameObj => nameObj.word)
      .subscribe(
        name => {
          this.userName=name.toString();
          this.name = this._updateWords('name', this.name, name);
          this._setError();
          console.log('name:::', this.userName);
        }
      );
  }
  private _listenUpdate() {
    this.updateSub = this.speech.words$
      .filter(obj => obj.type === 'go')
      .map(removeObj => removeObj.word)
      .subscribe(
        remove => {
          this.remove = this._updateWords('remove', this.remove, remove);
          this._setError();
          console.log('invoke remove:::');
        }
      );
  }
  private _listenHelp() {
    this.helpSub = this.speech.words$
      .filter(obj => obj.type === 'help')
      .map(helpObj => helpObj.word)
      .subscribe(
        help => {
          this.help = this._updateWords('help', this.help, help);
          this._setError();
          console.log('help:', help);
        }
      );
  }
   private _listenErrors() {
    this.errorsSub = this.speech.errors$
      .subscribe(err => this._setError(err));
  }

  private _setError(err?: any) {
    if (err) {
      console.log('Speech Recognition:', err);
      this.errorMsg = err.message;
      //speech
      var utterance = new SpeechSynthesisUtterance(err.message);
      window.speechSynthesis.speak(utterance);
      //incase of voice error: default item
      this.addDefaultIncaseVoiceError();
    } else {
      this.errorMsg = null;
   }
  }

  ngOnDestroy() {
    this.nounSub.unsubscribe();
    this.verbSub.unsubscribe();
    this.adjSub.unsubscribe();
    this.errorsSub.unsubscribe();
    this.mobileSub.unsubscribe();
    this.goSub.unsubscribe();
    this.removeSub.unsubscribe();
    this.updateSub.unsubscribe();
    this.helpSub.unsubscribe();
    this.nameSub.unsubscribe();
  }
  handleChatBot(){
    console.log('handle chatbot.......');
    
   }
  prepareCartList(){
    //dummy data, can be retrieved from db
    console.log('before adding'+this.productName);
    for (let i = 0; i <1; i++) {
      console.log('this.dummyDataCount:'+this.dummyProducts[this.dummyDataCount-1].id+":::"+this.dummyDataCount);
        if(this.dummyProducts[this.dummyDataCount-1].id==this.dummyDataCount){
          //modifying name
          this.dummyProducts[this.dummyDataCount-1].name=this.productName;
           this.cartItems.push(this.dummyProducts[this.dummyDataCount-1]);
           console.log('this.dummyDataCount:'+this.dummyDataCount);
           this.dummyDataCount++;
         }
        }
   }
   addDefaultIncaseVoiceError(){
    //dummy data, can be retrieved from db
    console.log('voice error');
    for (let i = 0; i <1; i++) {
        if(this.dummyProducts[this.dummyDataCount-1].id==this.dummyDataCount){
          this.dummyProducts[this.dummyDataCount-1].name="Cara Pils Beer";
           this.cartItems.push(this.dummyProducts[this.dummyDataCount-1]);
           this.dummyDataCount++;
         }
        }
   }
   feedData(){
    this.dummyProducts=[
    {"id":1,"name":"","price":10000.00,"qty":1},
    {"id":2,"name":"","price":2000.00,"qty":2},
    {"id":3,"name":"","price":300.00,"qty":3},
    {"id":4,"name":"","price":40.00,"qty":4},
    {"id":5,"name":"","price":50000.00,"qty":5},
    {"id":6,"name":"","price":50000.00,"qty":6},
    {"id":7,"name":"","price":50000.00,"qty":1},
    {"id":8,"name":"","price":50000.00,"qty":2},
    {"id":9,"name":"","price":50000.00,"qty":5},
    {"id":10,"name":"","price":50000.00,"qty":5}];
   } 
   totalAmount(){
    let tot=0;
    for(let e of this.cartItems){
      tot=tot+(e.price*e.qty);
    }
    return tot;
  }
   //removing cart: by id
   removeCartItem(idx:string){
     console.log('invoking remove...:'+idx);
     this.cartItems.splice(+idx,1);
   }
    
}
