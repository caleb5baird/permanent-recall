import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Passage } from './passage.model';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class PassageService {

  passages: Passage[] = [new Passage(), new Passage()];
  maxPassageId = 0;
  passageListChangedEvent = new Subject<Passage[]>();

  constructor() { }


  getDailyReview(): Passage[] {
    return this.passages.filter(passage => passage.reviews && passage.reviews.length < 7);
  }

  getWeeklyReview(date: Date): Passage[] {
    return this.passages.filter(passage => passage.reviews
      && 7 <= passage.reviews.length && passage.reviews.length < 11
      && moment(passage.reviews[passage.reviews.length - 1]).diff(moment(date), 'week') >= 1)
  }

  getMonthlyReview(date: Date): Passage[] {
    return this.passages.filter(passage => passage.reviews
      && 11 <= passage.reviews.length && passage.reviews.length < 23
      && moment(passage.reviews[passage.reviews.length - 1]).diff(moment(date), 'month') >= 1)
  }

  getYearlyReview(date: Date): Passage[] {
    return this.passages.filter(passage => passage.reviews
      && passage.reviews.length >= 23
      && moment(passage.reviews[passage.reviews.length - 1]).diff(moment(date), 'year') >= 1)
  }

  getTodaysReviewList(): Passage[] {
    let date = new Date();
    let reviewList = [].concat(
      this.getDailyReview(),
      this.getWeeklyReview(date),
      this.getMonthlyReview(date),
      this.getYearlyReview(date)
    )
    return reviewList;
  }

  addPassage(passage: Passage): void {
    if (passage) {
      this.passages.push(passage);
      this.passageListChangedEvent.next();
    }
  }
}
