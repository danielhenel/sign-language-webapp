import {Dish} from "./dish";

export class Order {
  constructor(
    public id: number,
    public userId: number,
    public date: string,
    public dishes: Map<Dish, number>,
    public total: number,
  ){}
}
