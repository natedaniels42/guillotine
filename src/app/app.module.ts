import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GuillotineComponent } from './components/guillotine/guillotine.component';
import { GameComponent } from './components/game/game.component';
import { CrowdComponent } from './components/crowd/crowd.component';
import { BoardComponent } from './components/board/board.component';
import { PrimeNGModule } from './primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from './material.module';
import { CorrectDialogComponent } from './components/correct-dialog/correct-dialog.component';
import { LoseDialogComponent } from './components/lose-dialog/lose-dialog.component';
import { ChooseDialogComponent } from './components/choose-dialog/choose-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { RandomWordService } from './services/random-word.service';

@NgModule({
  declarations: [
    AppComponent,
    GuillotineComponent,
    GameComponent,
    CrowdComponent,
    BoardComponent,
    CorrectDialogComponent,
    LoseDialogComponent,
    ChooseDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimeNGModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [RandomWordService],
  bootstrap: [AppComponent]
})
export class AppModule { }
