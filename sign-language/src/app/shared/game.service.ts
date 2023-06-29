import {Injectable} from '@angular/core';
import {Alphabet} from "../../models/alphabet";
import {HttpClient, HttpHeaders} from "@angular/common/http";

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

  constructor(private http: HttpClient) {
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

    if(letter == this.lettersLeft[0]){
      // remove all occurrences of letter
      this.lettersLeft.shift();
      if (localStorage.getItem('currentUser')){
        this.http.post(
          '/api/update/points',
          {"username" : localStorage.getItem('currentUser')},
          {headers: new HttpHeaders( {'Content-Type': 'application/json'})}
        ).subscribe((data: any) => {
            console.log(data);
        });
      }
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
