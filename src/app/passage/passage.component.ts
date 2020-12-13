import { Component, Input, OnInit } from '@angular/core';
import { Passage } from '../passage.model';
import { PassageService } from '../passage.service';

@Component({
  selector: 'app-passage',
  templateUrl: './passage.component.html',
  styleUrls: ['./passage.component.scss']
})
export class PassageComponent implements OnInit {

  @Input() passage: Passage;

  constructor(private passageService: PassageService) { }

  ngOnInit(): void {}

  markAsReviewed(): void {
    this.passageService.review(this.passage);
  }

}
