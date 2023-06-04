
type letterEntry = {
  word: string,
  imageUrl: string
}

export class Letter {

  letter: string;
  words: letterEntry[];

  constructor(letter: string, letterData: { word: string; imageUrl: string }[]) {
    this.letter = letter;
    this.words = [];
    for (let entry of letterData) {
      this.words.push(entry);
    }
  }

  getRandomWord(): [string, string] {
    let randIndex = Math.floor(Math.random() * this.words.length);
    return [this.words[randIndex].word.toLowerCase(), this.words[randIndex].imageUrl];
  }
}


