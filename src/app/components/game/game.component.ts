import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RandomWordService } from 'src/app/services/random-word.service';
import { ChooseDialogComponent } from '../choose-dialog/choose-dialog.component';
import { CorrectDialogComponent } from '../correct-dialog/correct-dialog.component';
import { LoseDialogComponent } from '../lose-dialog/lose-dialog.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  word: string[] = [];
  remainingGuesses = 7;
  wrongGuesses = 0;
  correct = false;
  lose = false;
  newGame = false;
  choose = true;
  typeWord = false;

  newWord = new FormControl('');
  wordForm = new FormGroup({
    newWord: this.newWord
  });

  constructor(public dialog: MatDialog, public randomWordService: RandomWordService) { }

  ngOnInit(): void {
    const chooseDialog = this.dialog.open(ChooseDialogComponent, {
      width: '70vw',
      height: '50vh'
    });

    chooseDialog.afterClosed().subscribe((result: any) => {
      if (result === 'random') {
        this.randomWordService.getRandom().subscribe((words) => {
          const randomIndex = Math.floor(Math.random() * words.length);

          this.word = words[randomIndex].toUpperCase().split('');
          console.log(this.word);
        });
      } else {
        this.word = result.split('');
      }
    });
  }

  guess(event: Event) {
    this.remainingGuesses = Number(event);
  }

  guessTotal(event: Event) {
    this.remainingGuesses = Number(event);
  }

  wrongGuess() {
    this.remainingGuesses--;
    this.wrongGuesses++;

    if (this.remainingGuesses === 0) {
      this.playAudio('assets/audio/guillotine.mp3');
      setTimeout(() => {
        this.playAudio('assets/audio/cheer.wav');
      }, 5000)
      setTimeout(() => {
        // this.lose = true;
        const loseDialog = this.dialog.open(LoseDialogComponent, {
          width: '70vw',
          height: '50vh',
          data: {
            word: this.word.join('')
          }
        });

        loseDialog.afterClosed().subscribe(() => {
          const chooseDialog = this.dialog.open(ChooseDialogComponent, {
            width: '70vw',
            height: '50vh'
          });

          chooseDialog.afterClosed().subscribe((result: any) => {
            this.playAgain();
            
            if (result === 'random') {
              this.randomWordService.getRandom().subscribe((words) => {
                const randomIndex = Math.floor(Math.random() * words.length);
      
                this.word = words[randomIndex].toUpperCase().split('');
                console.log(this.word);
              });
            } else {
              this.word = result.split('');
            }
          });
        });
      }, 10000)
    }
  }

  correctGuess() {
    this.playAudio('assets/audio/boo.mp3');

    const correctDialog = this.dialog.open(CorrectDialogComponent, {
      width: '70vw',
      height: '50vh'
    });

    correctDialog.afterClosed().subscribe(() => {
      const chooseDialog = this.dialog.open(ChooseDialogComponent, {
        width: '70vw',
        height: '50vh'
      });

      chooseDialog.afterClosed().subscribe((result: any) => {      
        this.playAgain();

        if (result === 'random') {
          this.randomWordService.getRandom().subscribe((words) => {
            const randomIndex = Math.floor(Math.random() * words.length);
  
            this.word = words[randomIndex].toUpperCase().split('');
            console.log(this.word);
          });
        } else {
          this.word = result.split('');
        }
      })
    })
  }

  playAgain() {
    this.newWord.setValue('');
    this.word = [];
    this.remainingGuesses = 10;
    this.newGame = this.newGame ? false : true;
  }

  playAudio(file: string){
    let audio = new Audio();
    audio.src = file;
    audio.load();
    audio.play();
  }

  chooseRandom() {

  }

  
  makeUpper() {
    if (this.newWord.value !== this.newWord.value.toUpperCase()) {
      this.newWord.setValue(this.newWord.value.toUpperCase());
    }
  }

  setTypeWord(bool: boolean) {
    this.typeWord = bool;
  }

  setWord() {
    this.word = this.newWord.value.split('');
    this.choose = false;
    this.lose = false;
    this.correct = false;
    this.typeWord = false;
  }
}
