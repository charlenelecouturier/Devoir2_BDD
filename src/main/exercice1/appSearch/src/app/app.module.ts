import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonService } from './common.service';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatButtonModule } from '@angular/material/button';


import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchSpellComponent } from './search-spell/search-spell.component';
import { FrontBarComponent } from './front-bar/front-bar.component';
import { SpellPageComponent } from './spell-page/spell-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchSpellComponent,
    FrontBarComponent,
    SpellPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
