import { Component } from '@angular/core';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent {
  playerRankings = [
    { name: 'John', score: 100 },
    { name: 'Alice', score: 95 },
    { name: 'Bob', score: 85 },
    { name: 'Charlie', score: 75 },
    { name: 'Eve', score: 60 },
  ];

}
