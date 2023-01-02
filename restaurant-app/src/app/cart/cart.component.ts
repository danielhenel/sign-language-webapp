import {Component} from '@angular/core';
import {Dish} from "../../models/dish";
import {CartService} from "../shared/cart.service";
import {UserService} from "../shared/user.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent {
  user: User;
  title: string = 'Cart';
  dishesCart: Map<Dish, number>;
  isOrderPlaced: boolean = false;

  constructor(private cartService: CartService,
              private userService: UserService) {
    this.dishesCart = cartService.dishesCart;
    this.user = userService.user;
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

  calculateTotal() {
    let total: number = 0;
    for(let [dish, quantity] of this.dishesCart) {
      total += dish.price * quantity;
    }
    return total;
  }

  orderSingleDish(dish: Dish) {
    if(this.dishesCart.has(dish)) {
      let singleDishOrder = new Map<number, number>();
      let quantity = this.dishesCart.get(dish)!;
      singleDishOrder.set(dish.id, quantity);
      this.user.addOrder(singleDishOrder, dish.price * quantity);
      this.isOrderPlaced = true;
      // remove the dish from the cart after placing the order
      this.dishesCart.delete(dish);
    } else {
      console.log("Cart is empty! Please add some dishes to your cart before placing the order.");
      this.isOrderPlaced = false;
    }
  }

  // order all dishes from the cart
  placeOrder() {
    if(this.dishesCart.size > 0) {
      this.user.addOrder(this.getDishId_QuantityMap(), this.calculateTotal());
      this.isOrderPlaced = true;
      console.log(this.dishesCart);
      console.log(this.user.orderHistory);
      this.dishesCart.clear();
    } else {
      console.log("Cart is empty! Please add some dishes to your cart before placing the order.");
      this.isOrderPlaced = false;
    }
  }

  // get map: dishId -> quantity instead of dish -> quantity
  // in order to send it to the backend
  getDishId_QuantityMap(): Map<number, number>{
    let dishId_quantity = new Map<number, number>();
    this.dishesCart.forEach(
      (count, dish) => {
        dishId_quantity.set(dish.id, count);
      });
    return dishId_quantity;
  }

  clearCart() {
    this.dishesCart.forEach(
      (count, dish) => {
        dish.maxAvailable += count;
      });
    this.dishesCart.clear();
    this.isOrderPlaced = false;
  }
}
