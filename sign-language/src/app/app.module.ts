import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {appRoutes} from "./routes";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CameraDetectionComponent } from './camera-detection/camera-detection.component';
import { WebcamModule } from 'ngx-webcam';
import { CameraCaptureComponent } from './camera-capture/camera-capture.component';
import { HomepageComponent } from './homepage/homepage.component';
import {RouterModule} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {LoginComponent} from "./login/login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {RegisterComponent} from "./register/register.component";
import { RankingComponent } from './ranking/ranking.component';
import { FlashcardsComponent } from './flashcards/flashcards.component';
import { HttpClientModule } from '@angular/common/http';
import { GameComponent } from './game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    CameraDetectionComponent,
    CameraCaptureComponent,
    HomepageComponent,
    LoginComponent,
    RegisterComponent,
    RankingComponent,
    FlashcardsComponent,
    GameComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        WebcamModule,
        RouterModule.forRoot(appRoutes),
        MatIconModule,
        ReactiveFormsModule,
        MatButtonModule,
        HttpClientModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
