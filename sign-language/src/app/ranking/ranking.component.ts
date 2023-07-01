import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent {
  playerRankings: any[] = [];

  constructor(private http: HttpClient) {}
  
  ngOnInit() {
    this.http.get<any[]>('/api/ranking').subscribe((data: any[]) => {
      this.playerRankings = data;
    });
  }

  getPlayerName(player: any): string {
    return Object.keys(player)[0];
  }  

  getPlayerScore(player: any): any {
    return Object.values(player)[0];
  }  
}
