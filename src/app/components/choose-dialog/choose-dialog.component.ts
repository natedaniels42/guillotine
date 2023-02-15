import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-choose-dialog',
  templateUrl: './choose-dialog.component.html',
  styleUrls: ['./choose-dialog.component.scss']
})
export class ChooseDialogComponent implements OnInit {
  typeWord = false;
  
  newWord = new FormControl('');
  wordForm = new FormGroup({
    newWord: this.newWord
  });
  constructor() { }

  ngOnInit(): void {
  }

  makeUpper() {
    if (this.newWord.value !== this.newWord.value.toUpperCase()) {
      this.newWord.setValue(this.newWord.value.toUpperCase());
    }
  }

  setTypeWord(bool: boolean) {
    this.typeWord = bool;
  }

  chooseRandom() {
    
  }

}
