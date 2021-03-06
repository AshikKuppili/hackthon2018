import { DialogflowService } from './services/dialogflow.service';
import { MessageItemComponent } from './components/message-item/message-item.component';
import { MessageFormService } from './components/message-form/message-form.service';
import { MessageFormComponent } from './components/message-form/message-form.component';
import { MessageListComponent } from './components/message-list/message-list.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { SpeechService } from './speech.service';
import { ListenComponent } from './listen/listen.component';
import { MadlibsService } from './madlibs.service';
import { FormsModule } from '@angular/forms';
import { WordsFormComponent } from './words-form/words-form.component';
import { EventappComponent } from './eventapp/eventapp.component';
import { ShoppingModule } from './shopping/shopping.module';
import { VoicetextComponent } from './voicetext/voicetext.component';

@NgModule({
  declarations: [
    AppComponent,
    ListenComponent,
    WordsFormComponent,
    EventappComponent,
    VoicetextComponent,
    MessageListComponent,
    MessageFormComponent,
    MessageItemComponent
  ],
  imports: [
    BrowserModule,FormsModule,ShoppingModule,RouterModule.forRoot(appRoutes),HttpModule
  ],
  providers: [SpeechService,MadlibsService,DialogflowService,MessageFormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
