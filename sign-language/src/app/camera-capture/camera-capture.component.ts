import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GameService} from "../shared/game.service";


@Component({
  selector: 'app-camera-capture',
  templateUrl: './camera-capture.component.html',
  styleUrls: ['./camera-capture.component.css']
})

export class CameraCaptureComponent implements OnInit {
  private trigger: Subject<any> = new Subject();
  public webcamImage!: WebcamImage;
  private nextWebcam: Subject<any> = new Subject();
  sysImage = '';

  constructor(private http: HttpClient, private gameService: GameService) {}

  ngOnInit() {}

  public getSnapshot(): void {
    this.trigger.next(void 0);
  }

  public captureImg(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.sysImage = webcamImage!.imageAsDataUrl;
    // console.log(this.webcamImage.imageAsBase64);

    // get the prediction from the server
    this.http.post(
      '/api/classify',
      {image: this.webcamImage.imageAsBase64},
      {headers: new HttpHeaders( {'Content-Type': 'application/json'})}
    ).subscribe((data: any) => {
      console.log(data);
      // check if letter in word and update game state
      this.gameService.guessLetter(data.letter);
      this.gameService.setLastGuess(data.letter, data.confidence);
    });
  }

  public get invokeObservable(): Observable<any> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<any> {
    return this.nextWebcam.asObservable();
  }
}
