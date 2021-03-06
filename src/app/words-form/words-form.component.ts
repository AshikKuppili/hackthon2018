// src/app/words-form/words-form.component.ts
import { Component, Input } from '@angular/core';
import { MadlibsService } from './../madlibs.service';

@Component({
  selector: 'app-words-form',
  templateUrl: './words-form.component.html',
  styleUrls: ['./words-form.component.scss']
})
export class WordsFormComponent {
  @Input() nouns: string[];
  @Input() verbs: string[];
  @Input() adjs: string[];
  @Input() mobiles: string[];
  @Input() cartItems: string[];
  generating = false;
  placeholders = {
    noun: ['person', 'place', 'place', 'thing', 'thing'],
    verb: ['present', 'present', 'past', 'past', 'past']
  };

  constructor(private ml: MadlibsService) {
   // this.prepareCartList();
   }

  trackWords(index) {
    return index;
  }

  getPlaceholder(type: string, index: number) {
    return this.placeholders[type][index];
  }

  done() {
    this.ml.submit({
      nouns: this.nouns,
      verbs: this.verbs,
      adjs: this.adjs,
      mobiles: this.mobiles,
      //setting cart item
      cartItems: this.cartItems
     });
    this.generating = true;
  }
 
}