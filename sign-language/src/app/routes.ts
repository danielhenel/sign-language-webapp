import { Routes } from '@angular/router';
import {CameraCaptureComponent} from "./camera-capture/camera-capture.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {LoginComponent} from "./login/login.component";
import {RankingComponent} from "./ranking/ranking.component";
import {RegisterComponent} from "./register/register.component";
import { FlashcardsComponent } from './flashcards/flashcards.component';


export const appRoutes:Routes = [
  { path: '', component: HomepageComponent },
  { path: 'home', component: HomepageComponent },
  { path: "camera-capture", component: CameraCaptureComponent},
  { path: "login", component: LoginComponent},
  { path: "register", component: RegisterComponent},
  { path: "ranking", component: RankingComponent},
  { path: "flashcards", component: FlashcardsComponent}
];
