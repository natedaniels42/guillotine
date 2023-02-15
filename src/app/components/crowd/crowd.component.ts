import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-crowd',
  templateUrl: './crowd.component.html',
  styleUrls: ['./crowd.component.scss']
})
export class CrowdComponent implements OnInit, OnChanges {
  @Input() remainingGuesses!: number;
  @Input() newGame = false;
  colorArr = ['black', 'silver', 'gray', 'maroon', 'red', 'purple', 'fuchsia', 'green', 'lime', 'olive', 'yellow', 'navy', 'blue', 'teal', 'aqua'];
  classArr: {color: string, cheer: string}[] = [];

  constructor() { }

  ngOnInit(): void {
    console.log(this.remainingGuesses);
    while (this.classArr.length < 48) {
      this.classArr.push(this.generateClass());
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.newGame) {
      this.classArr = [];
      while (this.classArr.length < 48) {
        this.classArr.push(this.generateClass());
      }
      this.newGame = false;
    }
  }

  generateClass(): {color: string, cheer: string} {
    const randomColor = Math.floor(Math.random() * this.colorArr.length);
    const randomCheer = Math.ceil(Math.random() * 3);
    return {color: this.colorArr[randomColor], cheer: ` cheer${randomCheer}`};
  }
}
