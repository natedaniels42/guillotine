import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-guillotine',
  templateUrl: './guillotine.component.html',
  styleUrls: ['./guillotine.component.scss']
})
export class GuillotineComponent implements OnInit, OnChanges {
  @Input() wrongGuesses = 0;
  @Input() remainingGuesses = 7;
  @Input() newGame = false;
  @Output() guessTotal = new EventEmitter();
  @Output() guess = new EventEmitter();
  lowerIndex = 10;
  startingGuesses = 7;
  step = '';

  constructor() { }

  ngOnInit(): void {
    this.guessTotal.emit(this.startingGuesses);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.wrongGuesses) {
      this.lowerBlade();
    }
    if (changes.newGame) {
      console.log('yes');
      this.step = '';
      this.newGame = false;
      this.lowerIndex = 10;
    }
  }

  lowerBlade() {
    this.lowerIndex = Math.floor(this.remainingGuesses / this.startingGuesses * 10);
    this.step = `step${this.lowerIndex}`;
  }

}
