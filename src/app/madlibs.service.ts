import { Input } from '@angular/core';
// src/app/madlibs.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MadlibsService {
  @Input() mobiles: string[];
  submit$ = new Subject<any>();
  words: any;
  constructor() {}
  submit(eventObj) {
    // form submitted with form results
    this.submit$.next(eventObj);
    this.words = eventObj;
  }
}