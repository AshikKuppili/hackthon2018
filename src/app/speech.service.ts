// src/app/speech.service.ts
import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs/Subject';

// TypeScript declaration for annyang
declare var annyang: any;

@Injectable()
export class SpeechService {

  words$ = new Subject<{[key: string]: string}>();
  errors$ = new Subject<{[key: string]: any}>();
  listening = false;
  userName:string;
  constructor(private zone: NgZone) {}

  get speechSupported(): boolean {
    return !!annyang;
  }

  init() {
    const commands = {
      'noun :noun': (noun) => {
        this.zone.run(() => {
          this.words$.next({type: 'noun', 'word': noun});
        });
      },
      'verb :verb': (verb) => {
        this.zone.run(() => {
          this.words$.next({type: 'verb', 'word': verb});
        });
      },
      'adjective :adj': (adj) => {
        this.zone.run(() => {
          this.words$.next({type: 'adj', 'word': adj});
        });
      },
      'add :mobile': (mobile) => {
        this.zone.run(() => {
          this.words$.next({type: 'mobile', 'word': mobile});
        });
      },
      'help :help': (help) => {
        this.zone.run(() => {
          this.words$.next({type: 'help', 'word': help});
        });
      },
      //take control of buttons
      'go': function myFunction() {
      var x = document.getElementById("heading");
      x.innerHTML = "INVOICE";
      x.setAttribute("align", "center");
      //document.getElementById("tbl").rows.innerHTML = "*"
      document.getElementById("gobtn").style.display="none"; 
      //document.getElementById("cancelbtn").style.background='#000000';
      //document.getElementById("btnHeader").style.display="none";
      annyang.abort();
      this.listening = false;
      var utterance = new SpeechSynthesisUtterance('Thanks you..Collect your bill');
      window.speechSynthesis.speak(utterance);
     /*
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }*/
    },
      'pop:remove': (remove) => {
        this.zone.run(() => {
          this.words$.next({type: 'remove', 'word': remove});
        });
      },
      'name': function() {//speech
        var utterance = new SpeechSynthesisUtterance('Wel come'+this.userName);
        window.speechSynthesis.speak(utterance);
      },
      'modify:modify': (modify) => {
        this.zone.run(() => {
          this.words$.next({type: 'modify', 'word': modify});
        });
      }};
    annyang.addCommands(commands);

    // Log anything the user says and what speech recognition thinks it might be
    // annyang.addCallback('result', (userSaid) => {
    //   console.log('User may have said:', userSaid);
    // });
    annyang.addCallback('errorNetwork', (err) => {
      this._handleError('network', 'A network error occurred.', err);
    });
    annyang.addCallback('errorPermissionBlocked', (err) => {
      this._handleError('blocked', 'Browser blocked microphone permissions.', err);
    });
    annyang.addCallback('errorPermissionDenied', (err) => {
      this._handleError('denied', 'User denied microphone permissions.', err);
    });
    annyang.addCallback('resultNoMatch', (userSaid) => {
      this._handleError(
        'no match',
        'Spoken command not recognized. So much noise,better have some Colruyt special Cara Pils beer, Enjoy..".',
        { results: userSaid });
    });
  }
 

  private _handleError(error, msg, errObj) {
    this.zone.run(() => {
      this.errors$.next({
        error: error,
        message: msg,
        obj: errObj
      });
    });
  }

  startListening() {
    annyang.start();
    this.listening = true;
  }

  abort() {
    annyang.abort();
    this.listening = false;
  }

  
 
}
