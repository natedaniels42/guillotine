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
      this.guessedWord = this.word.map((letter: string) => letter === '\'' || letter === '-' ? letter : ' ');

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
    
    let letterArr: string[] = [];

    switch(letter) {
      case 'C':
        letterArr = ['C','Ç'];
        break;
      case 'A':
        letterArr = ['A','À','Á','Â','Ã','Ä','Å'];
        break;
      case 'E':
        letterArr = ['E','È','É','Ê','Ë'];
        break;
      case 'I':
        letterArr = ['I','Ì','Í','Î','Ï'];
        break;
      case 'O':
        letterArr = ['O','Ò','Ó','Ô','Õ','Ö'];
        break;
      case 'U':
        letterArr = ['U','Ù','Ú','Û','Ü'];
        break;
      default:
        letterArr = [letter];
    }
    
    let goodGuess = false;

    this.word.forEach((l: string, i: number) => {
      if (letterArr.includes(l)) {
        this.guessedWord[i] = l;
        goodGuess = true;
      };

      if (i + 1 === this.word.length && !goodGuess) {
        this.wrongGuesses++;
        this.remainingGuesses--;
        this.wrongGuess.emit();
        return;
      }
    });
  
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

  // checkLetter(letter: string): boolean {
  //   switch
  // }
}
