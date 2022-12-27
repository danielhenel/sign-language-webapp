import {Component, Input, OnInit} from '@angular/core';
import {Dish} from "../models/dish";
import dishesData from "../assets/json/dishes.json";
import {DishService} from "./shared/dish.service";
import {Filter} from "../models/filter";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'restaurant-app';
  dishesList: Dish[] = [];
  dishesCart = new Map<Dish, number>();
  // filtering
  filter: Filter;

  constructor(private dishService: DishService) {}

  ngOnInit() {
    this.dishesList = this.dishService.getDishes();
    // add default dishes to cart for testing purposes
    this.dishesCart.set(this.dishesList[0], 1);

    // initialize filter used for dishes filtering
    this.filter = new Filter();
  }

  getAllCategories() {
    let categories = new Set<string>();
    this.dishesList.forEach(dish => categories.add(dish.category));
    return Array.from(categories);
  }

  getAllOfCuisines() {
    let cuisines = new Set<string>();
    this.dishesList.forEach(dish => cuisines.add(dish.cuisine));
    return Array.from(cuisines);
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
