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

  removeDishFromMenu(name: string) {
    console.log(name + ' removed from the menu');
    this.dishes = this.dishes.filter(dish => dish.name !== name);
  }

  addDishToCart(dish: Dish) {
    if (this.dishesCart.has(dish)) {
      this.dishesCart.set(dish, this.dishesCart.get(dish)! + 1);
    } else {
      this.dishesCart.set(dish, 1);
    }
  }
}
