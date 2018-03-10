import { VoicetextComponent } from './voicetext/voicetext.component';
import {Routes} from '@angular/router'

export const appRoutes:Routes =[
    {path:'voicetext',component:VoicetextComponent},
    {path:'',redirectTo:'/voicesearch', pathMatch:'full'},
    {path:'**', component:VoicetextComponent}

]