import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Passage } from '../passage.model'
import { PassageService } from '../passage.service'

@Component({
  selector: 'app-passage-list',
  templateUrl: './passage-list.component.html',
  styleUrls: ['./passage-list.component.scss']
})
export class PassageListComponent implements OnInit {

  passages: Passage[] = [];
  subscription: Subscription;

  constructor(private passageService: PassageService) {}

  ngOnInit(): void {
    this.subscription = this.passageService.passageListChangedEvent.subscribe(
      ()=> {this.passages = this.passageService.getTodaysReviewList()})
    this.passages = this.passageService.getTodaysReviewList();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
