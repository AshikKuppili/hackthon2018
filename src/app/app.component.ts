import { Message } from './models/message';
import { Component } from '@angular/core';
import { SpeechService } from './speech.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public message : Message;
  public messages : Message[];
  title = 'app';
  constructor(public speech: SpeechService) {
    this.message = new Message('', 'assets/images/user.png');
    this.messages = [
      new Message('Welcome to chatbot universe', 'assets/images/bot.png', new Date())
    ];

  }
}
