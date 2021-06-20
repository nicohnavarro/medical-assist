import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
})
export class StarRatingComponent implements OnInit {
  @Input() score=0;
  @Input() maxScore = 5;
  @Input() forDisplay = false;
  @Output() rateChanged = new EventEmitter();

  typeStar = [];
  type = 'star_border';

  range = [];
  marked = -1;

  constructor() {}

  ngOnInit() {
    for (let i = 1; i <= this.maxScore; i++) {
      this.range.push(i);
      this.typeStar.push(this.type);
    }
  }

  setScore(point) {
    this.typeStar.fill(this.type, 0, this.maxScore);
    this.typeStar.fill('star', 0, point + 1);
    this.score = point + 1;
    this.rateChanged.emit(this.score);
  }
}
