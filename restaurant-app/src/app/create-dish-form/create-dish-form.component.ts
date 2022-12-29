import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Dish} from "../../models/dish";
import {Filter} from "../../models/filter";
import {FilterService} from "../shared/filter.service";
import {DishService} from "../shared/dish.service";

@Component({
  selector: 'app-create-dish-form',
  templateUrl: './create-dish-form.component.html',
  styleUrls: ['./create-dish-form.component.css']
})
export class CreateDishFormComponent implements OnInit {
  dishesList: Dish[];
  // passed to update min/max price
  filter: Filter;
  cuisine: string[] = [
    'American', 'Asian', 'British', 'Caribbean', 'Central European',
    'Chinese', 'Eastern European', 'French', 'Indian', 'Italian',
    'Japanese', 'Kosher', 'Mediterranean', 'Mexican', 'Middle Eastern',
    'Nordic', 'South American', 'South East Asian', 'Spanish', 'Thai',
    'Vietnamese', 'Other'
  ];
  category: string[] = ['Appetizer', 'Main', 'Dessert', 'Beverage','Salad', 'Soup', 'Vegan', 'Vegetarian', 'Gluten Free'];
  dishProperties: string[] = [
    'name', 'cuisine', 'category', 'ingredients',
    'maxAvailable', 'price', 'description', 'imageUrl'
  ];
  // default selected values
  cuisineSelect = this.cuisine[0];
  categorySelect = this.category[1];
  //if all fields are filled correctly, changes submit button from disabled to enabled and vice versa
  fieldsCorrect: boolean = false;

  dishForm!: FormGroup;

  constructor(private filterService: FilterService, private dishService: DishService) {
    this.filter = filterService.filter;
    this.dishesList = dishService.dishesList;
  }

  ngOnInit(): void {
    let name = new FormControl();
    let cuisine = new FormControl();
    let category = new FormControl();
    let ingredients = new FormControl();
    let maxAvailable = new FormControl();
    let price = new FormControl();
    let description = new FormControl();
    let imageUrl = new FormControl();
    this.dishForm = new FormGroup({
      name: name,
      cuisine: cuisine,
      category: category,
      ingredients: ingredients,
      maxAvailable: maxAvailable,
      price: price,
      description: description,
      imageUrl: imageUrl
    });
  }


  inputValid(formValues: any) {
    // check if all fields are filled
    return !Object.values(formValues).includes(null);
  }

  addNewDish(formValues: any) {
    let ingredients = formValues.ingredients.split(',').map((ingredient: string) => ingredient.trim());
    let newDish = new Dish(formValues.name, [], formValues.cuisine, formValues.category,
      ingredients, formValues.maxAvailable, formValues.price, formValues.description, formValues.imageUrl)
    this.dishesList.push(newDish);
    // update min/max price in filter
    this.filter.minPrice = Math.min(this.filter.minPrice, formValues.price);
    this.filter.maxPrice = Math.max(this.filter.maxPrice, formValues.price);
    console.log(this.dishesList);
  }
}
