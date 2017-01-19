import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AuthProviders, AngularFireModule, AuthMethods } from 'angularfire2';
import { AppComponent } from './app.component';
import { MapMyAreaComponent,PizzaDialog } from './map-my-area/map-my-area.component';
//modules not given by angular-cli
import { MaterialModule } from '@angular/material';
import { AgmCoreModule } from 'angular2-google-maps/core';
import 'hammerjs';
import { MapUpdateComponent } from './map-update/map-update.component';
import { AddOtherUsersComponent } from './add-other-users/add-other-users.component';

const firebaseConfig = {
    apiKey: "AIzaSyCUqdkw-CjdRJcVn8Z089oOekQxh2_3oq0",
    authDomain: "test-40eef.firebaseapp.com",
    databaseURL: "https://test-40eef.firebaseio.com",
    storageBucket: "test-40eef.appspot.com",
    messagingSenderId: "979968716629"
}

const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup,
  scope:['https://www.googleapis.com/auth/calendar']
}

@NgModule({
  declarations: [
    AppComponent,
    MapMyAreaComponent,
    PizzaDialog,
    MapUpdateComponent,
    AddOtherUsersComponent
  ],
  entryComponents:[
    PizzaDialog
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),//material root
    AgmCoreModule.forRoot({  //adding api key to google maps
      apiKey: 'AIzaSyBOgwYE2OjdnYMzcShcV98Dqix3A78Z8jY'
    }),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
