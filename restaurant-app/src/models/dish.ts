export class Dish {

  constructor(public name: string,
              public ratings: number[],
              public cuisine: string,
              public category: string,
              public ingredients: string[],
              public maxAvailable: number,
              public price: number,
              public description: string,
              public imageUrl: string
  ){}

  public decreaseAvailability() {
    this.maxAvailable--;
  }
}
