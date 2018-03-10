import { DialogflowService } from './../../services/dialogflow.service';
import { Message } from './../../models/message';
import { Component, OnInit, Input } from '@angular/core';
import {MessageFormService} from './message-form.service';

import { Observable } from 'rxjs/Observable'

export interface IWindow extends Window {
  webkitSpeechRecognition: any;
}
const {webkitSpeechRecognition}: IWindow = <IWindow>window;
const recognition = new webkitSpeechRecognition();

@Component({
  selector: 'message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent implements OnInit {

  @Input('message')
  private message : Message;

  @Input('messages')
  private messages : Message[];

  @Input('botText')
  private botText : string;


  recogSpeech: any = '';

  private data: Observable<string>;

  constructor(private dialogFlowService: DialogflowService, private msgService: MessageFormService ) { }

  ngOnInit() {
    MessageFormService.message = '';
    this.recogSpeech = 'test';
  }

  public sendMessage(botMsg:string) {
console.log('in send msg.........'+botMsg);

    this.message.timestamp = new Date();
   this.message.content = botMsg;
    this.messages.push(this.message);

    this.dialogFlowService.getResponse(this.message.content).subscribe(res => {
      this.messages.push(
        new Message(res.result.fulfillment.speech, 'assets/images/bot.png', res.timestamp)
      );
    });

    this.message = new Message('', 'assets/images/user.png');
    this.stopDictation();
  }


  /*startDictation() {


    if (window.hasOwnProperty('webkitSpeechRecognition')) {

      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.lang = "en-US";
      recognition.start();

      recognition.onresult = function(e) {
        this.recogSpeech = e.results[0][0].transcript;
        //MessageFormService.message = this.recogSpeech;
       console.log(this.recogSpeech);
        /!*var x = document.getElementById("textBox");
        x.innerHTML = "test";*!/
        //recognition.stop();
        // document.getElementById('labnol').submit();
      };
      //console.log(MessageFormService.message);

     // if(MessageFormService.message == null){
        //this.sendMessage('Dindnt understood');
      /!*} else {
        this.sendMessage(MessageFormService.message);
      }*!/
      //this.sendMessage(MessageFormService.message);
      //this.sendMessage(MessageFormService.message);
      recognition.onerror = function(e) {
        recognition.stop();
      };

    }
  }
*/
  stopDictation(){
    recognition.stop();
  }
}
