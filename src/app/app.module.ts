import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PasswordGeneratorComponent } from './password-generator/password-generator.component';
import { NavigationModule } from './navigation/navigation.module';

import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    PasswordGeneratorComponent,
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NavigationModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
