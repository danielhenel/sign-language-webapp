import {Component, Input} from '@angular/core';
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
}
