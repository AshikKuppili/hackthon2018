import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


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
    VoicetextComponent
  ],
  imports: [
    BrowserModule,FormsModule,ShoppingModule,RouterModule.forRoot(appRoutes)
  ],
  providers: [SpeechService,MadlibsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
