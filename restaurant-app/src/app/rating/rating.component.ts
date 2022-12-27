import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Dish} from "../../models/dish";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {
  @Input() dish: Dish;
  rating: number;
  ratingControl = new FormControl(0);
  // flag to show inform if user has already rated the dish
  hasRated: boolean = false;

  addRating() {
    if(this.hasRated){
      return;
    }
    this.dish.ratings.push(this.ratingControl.value || 0);
    this.hasRated = true;
    console.log(this.ratingControl.value);
  }
  // TODO: implement rating the dishes functionality
  //  it's needed to add new field to the dishes: ratings: number[]
  //  in which you should store all the ratings for the dish
  //  and then calculate the average rating for the dish and display it


  getAvgRating() {
    let avg = this.dish.ratings.reduce((a, b) => a + b, 0) / this.dish.ratings.length;
    // format to 2 decimal places
    return Number(avg).toFixed(2);
  }
}
