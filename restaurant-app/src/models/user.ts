import {Order} from "./order";
import {Dish} from "./dish";

export class User {
  constructor(
    public id: number,
    public username: string,
    public password: string,
    public role: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public phone: string,
    public address: string,
    public orderHistory: Order[]
    ){}

  addOrder(dishes: Map<Dish, number>) {
    let total = 0;
    // console.log(dishes);
    dishes.forEach((value, key) => {
      total += key.price * value;
    });
    let order = new Order(this.orderHistory.length + 1, this.id, new Date().toLocaleString(), dishes, total);
    this.orderHistory.push(order);
  }
}
