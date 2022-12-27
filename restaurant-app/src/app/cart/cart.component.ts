import {Component, Input} from '@angular/core';
import {Dish} from "../../models/dish";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent {
  title: string = 'Cart';
  @Input() dishesCart: Map<Dish, number> = new Map<Dish, number>();

  addDishToCart(dish: Dish) {
    if (this.dishesCart.has(dish)) {
      this.dishesCart.set(dish, this.dishesCart.get(dish)! + 1);
    } else {
      this.dishesCart.set(dish, 1);
    }
    dish.maxAvailable -= 1;
  }

  removeDishFromCart(dish: Dish) {
    if(this.dishesCart.has(dish)) {
      let newQuantity = this.dishesCart.get(dish)! - 1;
      if(newQuantity > 0) {
        this.dishesCart.set(dish, newQuantity);
      } else {
        this.dishesCart.delete(dish);
      }
      dish.maxAvailable += 1;
    }
  }

  calculateTotal() {
    let total: number = 0;
    for(let [dish, quantity] of this.dishesCart) {
      total += dish.price * quantity;
    }
    return total;
  }
}
