import {Component, Input, OnInit} from '@angular/core';
import {Dish} from '../../models/dish';


@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})

export class DishesComponent implements OnInit{
  title: string = 'Dishes';
  @Input() dishes: Dish[] = [];
  @Input() dishesCart: Map<Dish, number> = new Map<Dish, number>();
  // dishes meeting the filter criteria
  filteredDishesList: Dish[] = [];
  // filters
  @Input() filter: any;
  // searching for dishes by name
  @Input() filterText: any;

  ngOnInit(): void {
    // set init max, min prices
    this.filter.minPrice = this.getMinPrice();
    this.filter.maxPrice = this.getMaxPrice();
  }

  removeDishFromMenu(dishToDel: Dish) {
    console.log(dishToDel.name + ' removed from the menu');
    // remove from menu
    this.dishes = this.dishes.filter(dish => dish.name !== dishToDel.name);
    // remove from cart since it's no longer available
    if(this.dishesCart.has(dishToDel)) {
      this.dishesCart.delete(dishToDel);
    }
  }

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

  getMaxPrice() {
    console.log(
      Math.max(...this.dishes.map(dish => dish.price))
    )
    return Math.max(...this.dishes.map(dish => dish.price));
  }

  getMinPrice() {
    return Math.min(...this.dishes.map(dish => dish.price));
  }
}
