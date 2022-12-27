import { Injectable } from '@angular/core';
import {Dish} from "../../models/dish";
import dishesData from "../../assets/json/dishes.json";


@Injectable()
export class DishService {
  // from here HTTP requests will be made to get the data
  getDishes() {
    let dishesList: Dish[] = [];
    dishesData.forEach(dish => {
      dishesList.push(new Dish(dish.name, dish.ratings, dish.cuisine, dish.category,
          dish.ingredients, dish.maxAvailable, dish.price, dish.description, dish.imageUrl as string));
    });
    return dishesList;
  }
}
