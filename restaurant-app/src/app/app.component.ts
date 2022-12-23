import { Component } from '@angular/core';
import {Dish} from "../models/dish";
import dishesData from "../assets/json/dishes.json";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'restaurant-app';
  dishesList: Dish[] = [];
  dishesCart = new Map<Dish, number>();

  constructor() {
    dishesData.forEach(dish => {
        this.dishesList.push(new Dish(dish.name, dish.cuisine, dish.category,
          dish.ingredients, dish.maxAvailable, dish.price, dish.description, dish.imageUrl as string));
      }
    )
    // add default dishes to cart for testing
    this.dishesCart.set(this.dishesList[0], 1);
  }

  addDishToCart(dish: Dish) {
    if (this.dishesCart.has(dish)) {
      this.dishesCart.set(dish, this.dishesCart.get(dish)! + 1);
    } else {
      this.dishesCart.set(dish, 1);
    }
  }

  removeDishFromCart(dish: Dish) {
    if(this.dishesCart.has(dish)) {
      let newQuantity = this.dishesCart.get(dish)! - 1;
      if(newQuantity > 0) {
        this.dishesCart.set(dish, newQuantity);
      } else {
        this.dishesCart.delete(dish);
      }
    }
  }
}
