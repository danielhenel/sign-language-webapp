import {Letter} from "./letter";
import wordsJSON from "../assets/json/words.json";
import {Injectable} from "@angular/core";

@Injectable()
export class Alphabet{
  letters: Letter[] = []; // array of Letter objects

  constructor() {
    this.readData();
  }

  /*
  read data from JSON with letters and list of words and images
  and create Letter objects
  */
  readData() {
    // read data from wordJSON
    const data: { [key: string]: { word: string; imageUrl: string }[] } = wordsJSON;

    // get all keys from data
    let alphabet = Object.keys(data) as (keyof typeof data)[];

    for (let idx in alphabet) {
      let letter = alphabet[idx] as string;
      let letterData: { word: string; imageUrl: string }[] = data[letter];
      // create Letter object
      let letterObj = new Letter(letter, letterData);
      // add Letter object to array
      this.letters.push(letterObj);
    }
  }

  // method returning random letter
  getRandomLetter(): Letter {
    let randIndex = Math.floor(Math.random() * this.letters.length);
    return this.letters[randIndex];
  }

  // return [letter, word, imageUrl]
  getRandomWord(): [string, string, string] {
    let randLetter = this.getRandomLetter();
    return [randLetter.letter,...randLetter.getRandomWord()];
  }
}
