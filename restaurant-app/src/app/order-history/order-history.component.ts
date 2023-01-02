import {Component, OnInit} from '@angular/core';
import {Order} from "../../models/order";
import {User} from "../../models/user";
import {UserService} from "../shared/user.service";
import {DishService} from "../shared/dish.service";
import {Dish} from "../../models/dish";

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit{
  user: User;
  dishesList: Dish[];

  constructor(private userService: UserService,
              // dishService just for testing purposes
              public dishService: DishService
  ) { }

  ngOnInit(): void {
    this.user = this.userService.user;
    this.dishesList = this.dishService.dishesList;
  }

  // there's problem with iteration *ngFor over Map so conversion to an array may be of the workarounds
  // getDishesArray(order: Order): any[] {
  //   console.log(order.dishes);
  //   console.log(Array.from(order.dishes.entries()))
  //   return Array.from(order.dishes.entries());
  //   // let tmp = [order.dishes.keys(), order.dishes.values()];
  //   // console.log(tmp)
  //   // return tmp;
  // }

  // testing
  getDishesArray(): Map<string, number> {
    return new Map<string, number>([
      ["Pizza", 2],
      ["Pad thai", 1]
    ]);
  }
}
