import { Injectable } from '@angular/core';
import {Dish} from "../../models/dish";
import dishesData from "../../assets/json/dishes.json";


@Injectable()
export class DishService {
  dishesList: Dish[];

  constructor() {
    this.dishesList = [];
    this.getDishes();
  }

  // from here HTTP requests will be made to get the data
  getDishes() {
    dishesData.forEach(dish => {
      this.dishesList.push(new Dish(dish.name, dish.ratings, dish.cuisine, dish.category,
          dish.ingredients, dish.maxAvailable, dish.price, dish.description, dish.imageUrl as string));
    });
  }

  // in the end the Dish will be retrieved by id from the database
  getDishByName(name: string) {
    return this.dishesList.find(dish => dish.name.toLowerCase() === name.toLowerCase());
  }
}
