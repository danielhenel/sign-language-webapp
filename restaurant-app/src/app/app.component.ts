import {Component, OnInit} from '@angular/core';
import {Dish} from "../models/dish";
import dishesData from "../assets/json/dishes.json";
import {DishService} from "./shared/dish.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'restaurant-app';
  dishesList: Dish[] = [];
  dishesCart = new Map<Dish, number>();
  // obj instead of string to have non-primitive type
  filterText: object = {text: ''};

  constructor(private dishService: DishService) {}

  ngOnInit() {
    this.dishesList = this.dishService.getDishes();

    // add default dishes to cart for testing purposes
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
