import { Injectable } from '@angular/core';
import {Dish} from "../../models/dish";
import dishesData from "../../assets/json/dishes.json";
import {Review} from "../../models/review";


@Injectable()
export class DishService {
  dishesList: Dish[];

  constructor() {
    this.dishesList = [];
    this.getDishes();
  }

  // from here HTTP requests will be made to get the data
  private getDishes() {
    dishesData.forEach(dish => {
      let reviews: Review[] = [];
      dish.reviews.forEach(review => {
        reviews.push(new Review(review.nickname, review.title, review.date, review.reviewContent));
      })
      this.dishesList.push(new Dish(dish.name, dish.ratings, reviews, dish.cuisine, dish.category,
          dish.ingredients, dish.maxAvailable, dish.price, dish.description, dish.imageUrls));
    });
  }

  // in the end the Dish will be retrieved by id from the database
  getDishByName(name: string) {
    return this.dishesList.find(dish => dish.name.toLowerCase() === name.toLowerCase());
  }
}
