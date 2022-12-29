import { Routes } from '@angular/router';
import {DishesComponent} from "./dishes/dishes.component";
import {DishDetailsComponent} from "./dish-details/dish-details.component";
import {CartComponent} from "./cart/cart.component";
import {CreateDishFormComponent} from "./create-dish-form/create-dish-form.component";

export const appRoutes:Routes = [
  { path: 'menu', component: DishesComponent },
  { path: 'dish/:id', component: DishDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'create-dish', component: CreateDishFormComponent },
  { path: '', redirectTo: '/menu', pathMatch: 'full' },
  { path: '**', redirectTo: '/menu', pathMatch: 'full' }
];
