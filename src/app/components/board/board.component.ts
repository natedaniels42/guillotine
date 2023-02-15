import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnChanges {
  @Input() remainingGuesses!: number;
  @Input() newGame = false;
  @Input() word: string[] = ['J','E',' ','V','O','U','D','R','A','I','S',' ','U','N',' ','C','H','I','E','N'];  
  @Output() wrongGuess = new EventEmitter();
  @Output() correctGuess = new EventEmitter();
  letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  guessedLetters: string[] = [];
  guessedWord: string[] = [];
  wrongGuesses = 0; 
  totalGuesses!: number;

  constructor() { }

  ngOnInit(): void {
    this.guessedWord = this.word.map((letter: string) => letter === '\'' || letter === '-' ? letter : ' ');
    this.totalGuesses = this.remainingGuesses;
    console.log(this.guessedWord);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.newGame) {
      this.guessedLetters = [];
      this.wrongGuesses = 0;
      this.guessedWord = this.word.map(() => ' ');

      this.newGame = false;
    }
    if (changes.word) {
      this.guessedLetters = [];
      this.wrongGuesses = 0;
      this.guessedWord = this.word.map((letter: string) => letter === '\'' || letter === '-' ? letter : ' ');
    }
  }

  guessLetter(letter: string) {
    if (this.guessedLetters.includes(letter)) {
      return;
    }
    
    this.guessedLetters.push(letter);
    
    if (this.word.includes(letter)) {
      this.word.forEach((l: string, i: number) => {
        if (l === letter) {
          this.guessedWord[i] = letter;
        };
      });
    } else {
      this.wrongGuesses++;
      this.remainingGuesses--;
      this.wrongGuess.emit();
    }

    let correct = true;

    this.word.forEach((l: string, i: number) => {
      if (l !== this.guessedWord[i]) {
        correct = false;
      }
      if (i + 1 === this.word.length && correct) {
        this.correctGuess.emit();
      }
    })
  }
}
