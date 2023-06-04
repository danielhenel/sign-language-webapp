import {Injectable} from '@angular/core';
import {Alphabet} from "../../models/alphabet";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  alphabet: Alphabet;
  currentLetter: string = "";
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

  isLetterGuessed(letter: string): boolean {
    return this.lettersLeft.indexOf(letter) === -1;
  }
}
