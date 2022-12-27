import { Pipe, PipeTransform } from '@angular/core';
import {Dish} from "../../models/dish";


@Pipe({ name: 'searchPipe' })
export class SearchPipe implements PipeTransform {
  transform(dishes: Dish[], searchText: string): Dish[] {
    console.log('searchText: ' + searchText);
    if (!dishes)
      return [];
    if (!searchText)
      return dishes;
    searchText = searchText.toLowerCase();
    return dishes.filter(dish => {
      return dish.name.toLowerCase().includes(searchText);
    });
  }
}

