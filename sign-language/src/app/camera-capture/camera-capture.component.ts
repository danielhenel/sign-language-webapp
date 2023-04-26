import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import {HttpClient, HttpHeaders} from "@angular/common/http";


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
    console.info('got webcam image', this.sysImage);
  }
  public get invokeObservable(): Observable<any> {
    return this.trigger.asObservable();
  }
  public get nextWebcamObservable(): Observable<any> {
    return this.nextWebcam.asObservable();
  }

  public HTTPGET(){
      this.http.get<any>('/api/model')
      .subscribe((data: any) => {
   
          console.log("dsdsdsdsds" + data);
   
      });
  }

  // this.http.get<any>('/api/dishes')
  //     .subscribe((data: any) => {
  //       data.forEach((dish: any) => {
  //         console.log(dish);
  //         dishesPrepared.push(this.prepareDish(dish));
  //       });
  //     });

}
