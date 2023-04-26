import { Component } from '@angular/core';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.css']
})
export class FlashcardsComponent {
  alpha = Array.from(Array(26)).map((e, i) => i + 65);
  alphabet = this.alpha.map((x) => String.fromCharCode(x));

}
