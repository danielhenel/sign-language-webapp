import {Component, Input} from '@angular/core';
import {Dish} from '../../models/dish';


@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})

export class DishesComponent {
  title: string = 'Dishes';
  @Input() dishes: Dish[] = [];
  @Input() dishesCart: Map<Dish, number> = new Map<Dish, number>();

  // dishes meeting the filter criteria
  filteredDishesList: Dish[] = [];
  // searching for dishes by name
  @Input() filterText: any;


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
    return Math.max(...this.dishes.map(dish => dish.price));
  }

  getMinPrice() {
    return Math.min(...this.dishes.map(dish => dish.price));
  }
}
