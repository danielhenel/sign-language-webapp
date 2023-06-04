import {Component, OnInit} from '@angular/core';
import {GameService} from "../shared/game.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit{
  userInput: string = '';

  ngOnInit(): void {}

  testWithMockPredictions(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      // Perform the desired action when Enter key is pressed
      this.gameService.guessLetter(this.userInput.toLowerCase());
      console.log(this.userInput);
      this.userInput = '';
    }
  }

  constructor(public gameService: GameService) {}

  testClick(){
    this.gameService.generateWord();
    console.log("test");
    console.log(this.gameService.getInfo());
  }
}
