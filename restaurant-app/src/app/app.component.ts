import {Component, Input, OnInit} from '@angular/core';
import {Dish} from "../models/dish";
import dishesData from "../assets/json/dishes.json";
import {DishService} from "./shared/dish.service";
import {Filter} from "../models/filter";
import {Router} from "@angular/router";
import {CartService} from "./shared/cart.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'restaurant-app';
  dishesList: Dish[];
  dishesCart: Map<Dish, number>;
  filter: Filter;

  constructor(private dishService: DishService, public router: Router, private cartService: CartService) {
    this.dishesCart = cartService.dishesCart;
  }

  ngOnInit() {
    this.dishesList = this.dishService.dishesList;
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
    this.cartService.addDishToCart(dish);
  }

  removeDishFromCart(dish: Dish) {
    this.cartService.removeDishFromCart(dish);
  }
}
