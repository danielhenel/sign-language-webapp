import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { CameraCaptureComponent } from './camera-capture/camera-capture.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: "camera-capture", component: CameraCaptureComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
