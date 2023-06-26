import {Injectable} from '@angular/core';
import {Alphabet} from "../../models/alphabet";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  alphabet: Alphabet;
  currentLetter: string = "";
  currentLetterConfidence: number = 0;
  currentWord: string = "";
  currentImageUrl: string = "";
  lettersLeft: string[] = [];
  isGameStarted: boolean = false;
  isWordGuessed: boolean = false;


  constructor() {
    this.alphabet = new Alphabet();
  }

  generateWord(){
    let [letter, word, imageUrl] = this.alphabet.getRandomWord();
    this.currentLetter = letter;
    this.currentWord = word;
    this.currentImageUrl = imageUrl;
    this.lettersLeft = this.getWordLetters();
    this.isGameStarted = true;
  }

  getInfo(): string {
   return this.currentLetter + " " + this.currentWord + " " + this.currentImageUrl;
  }

  getWordLetters(): string[] {
    // remove spaces
    return this.currentWord.split('').filter(letter => letter.trim() !== '');
  }

  guessLetter(letter: string){
    letter = letter.toLowerCase();

    let index = this.lettersLeft.indexOf(letter);
    if(index > -1){
      // remove all occurrences of letter
      this.lettersLeft = this.lettersLeft.filter(l => l !== letter);
    }
    if(this.lettersLeft.length === 0){
      this.isWordGuessed = true;
      this.isGameStarted = false;
    }
  }

  setLastGuess(letter, confidence){
    this.currentLetter = letter;
    this.currentLetterConfidence = confidence;
  }

  getLastGuess(){
    // let approx_conf = (Math.round(this.currentLetterConfidence * 100)/100).toFixed(2); // round to 2 decimal places
    let approx_conf = Math.round(this.currentLetterConfidence * 100);
    console.log(approx_conf)
    return this.currentLetter + " (" + approx_conf + "%)";
  }

  isLetterGuessed(letter: string): boolean {
    return this.lettersLeft.indexOf(letter) === -1;
  }
}
