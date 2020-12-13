import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Passage } from './passage.model';
import * as moment from 'moment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PassageService {

  passages: Passage[] = [];
  maxPassageId = 0;
  passageListChangedEvent = new Subject<Passage[]>();

  constructor(private http: HttpClient) {
    this.http.get('http://localhost:3000/passages')
      .subscribe((responseData: {message: string, passages: Passage[]}) => {
        for (let i = 0; i < responseData.passages.length; ++i) {
          responseData.passages[i].reviews = responseData.passages[i].reviews.sort((lhs: Date, rhs: Date) => {
            if (lhs < rhs)
              return 1;
            else if (lhs === rhs)
              return 0;
            else
              return -1;
          });
        }
        this.passages = responseData.passages;
        this.passageListChangedEvent.next(this.passages.slice());
      }, (error:any) => console.error(error))
  }


  getDailyReview(): Passage[] {
    return this.passages.filter(passage => {
      return passage.reviews
        && passage.reviews.length < 7
        && (passage.reviews.length === 0
          || moment(passage.reviews[passage.reviews.length - 1])
            .diff(moment(new Date()), 'day') < 0)
    })
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

  review(passage: Passage): void {
    let changedPassage = {...passage};
    changedPassage.reviews.push(new Date());
    this.updatePassage(passage, changedPassage);
  }

  addPassage(passage: Passage): void {
    if (passage) {
      const headers = new HttpHeaders({'Content-Type': 'application/json'});

      // add to database
      this.http.post<{ message: string, passage: Passage }>
        ('http://localhost:3000/passages', passage, { headers: headers })
        .subscribe((responseData: {message: string, passage: Passage}) => {
          // add new document to documents
          this.passages.push(responseData.passage);
          this.passageListChangedEvent.next();
        });
    }
  }

  updatePassage(originalPassage: Passage, newPassage: Passage): void {
    if (originalPassage && newPassage) {
      const pos = this.passages.indexOf(originalPassage);

      if (pos === -1) {
        console.log('Cannot update passage. Failed to find original Passage.');
        console.log('OriginalPassage: ', JSON.stringify(originalPassage));
      } else {
        newPassage.id = originalPassage.id;
        newPassage._id = originalPassage._id;

        const headers = new HttpHeaders({'Content-Type': 'application/json'});

        // update database
        this.http.put('http://localhost:3000/passages/'
          + originalPassage.id, newPassage, { headers: headers })
          .subscribe(
            (response: Response) => {
              this.passages[pos] = newPassage;
              this.passageListChangedEvent.next();
            }
          );
      }
    }
  }

  deletePassage(passage: Passage): void {
    if (passage) {
      const pos = this.passages.indexOf(passage);

      if (pos === -1) {
        console.log('Cannot delete passage it cannot be found in passages.');
        console.log('Passage: ', JSON.stringify(passage));
      } else {
        this.http.delete('http://localhost:3000/passages/' + passage.id)
          .subscribe(
            (response: Response) => {
              this.passages.splice(pos, 1);
              this.passageListChangedEvent.next();
            }
          );
      }
    }
  }
}
