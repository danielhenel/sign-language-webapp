import {Component, OnInit} from '@angular/core';
import {GameService} from "../shared/game.service";
import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit{
  userInput: string = '';
  predicted = '';
  private model; 

  async ngOnInit(): Promise<void> {
    this.model = await tf.loadLayersModel('http://localhost:3000/models/signify/model.json');
    console.log(this.model.summary());
  }

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
