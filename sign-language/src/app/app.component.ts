import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Router} from "@angular/router";
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sign-language';

  constructor(public router: Router, private modalService: NgbModal) {}

  public open(modal: any): void {
    this.modalService.open(modal);
  }

}
