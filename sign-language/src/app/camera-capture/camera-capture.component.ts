import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import cv from "@techstark/opencv-js";


@Component({
  selector: 'app-camera-capture',
  templateUrl: './camera-capture.component.html',
  styleUrls: ['./camera-capture.component.css']
})

export class CameraCaptureComponent implements OnInit {
  constructor(private http: HttpClient) {  }
  private trigger: Subject<any> = new Subject();
  public webcamImage!: WebcamImage;
  private nextWebcam: Subject<any> = new Subject();
  sysImage = '';
  ngOnInit() {}
  public getSnapshot(): void {
    this.trigger.next(void 0);

  }
  public captureImg(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.sysImage = webcamImage!.imageAsDataUrl;

    // example
    const gray = new cv.Mat();
    var image = cv.imread(this.sysImage);
    var gray_image = cv.cvtColor(image, gray,cv.COLOR_RGBA2GRAY,0);
    console.info(gray_image);
    //

    console.info('got webcam image', this.sysImage);
    

  }
  public get invokeObservable(): Observable<any> {
    return this.trigger.asObservable();
  }
  public get nextWebcamObservable(): Observable<any> {
    return this.nextWebcam.asObservable();
  }

  public getDetection(){
      this.http.get<any>('/api/detection')
      .subscribe((data: any) => {
          console.log(data);
      });
  }
}
