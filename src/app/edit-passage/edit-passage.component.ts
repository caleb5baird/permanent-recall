import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Passage, Mode } from '../passage.model';
import { PassageService } from '../passage.service';

@Component({
  selector: 'app-edit-passage',
  templateUrl: './edit-passage.component.html',
  styleUrls: ['./edit-passage.component.scss']
})
export class EditPassageComponent implements OnInit {

  @Input() originalPassage: Passage;
  passage: Passage;
  @Input() mode: Mode;
  @Output() switchModeEvent = new EventEmitter<Mode>();


  constructor(
    private passageService: PassageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.passage = {...this.originalPassage};
  }

  onSubmit(form: NgForm): void {
    let value = form.value; // get values from forms fields

    let newPassage = new Passage();
    newPassage.prompt = value.prompt;
    newPassage.reference = value.reference;
    newPassage.text = value.text;

    if (this.originalPassage !== newPassage) {
      switch(this.mode) {
        case Mode.Edit:
          this.passageService.updatePassage(this.originalPassage, newPassage);
          this.switchModeEvent.emit(Mode.View);
          break;
        case Mode.Create:
          this.passageService.addPassage(newPassage);
          this.router.navigate(['/review-list']);
          break;
        default:
          console.error('Unrecognized mode: ', this.mode);
      }
    }

  }

  onCancel(): void {
    switch(this.mode) {
      case Mode.Edit:
        this.switchModeEvent.emit(Mode.View);
        break;
      case Mode.Create:
        this.router.navigate(['./review-list']);
        break;
      default:
        console.error('Unrecognized mode: ', this.mode);
    }
  }

  deletePassage(): void {
    this.passageService.deletePassage(this.originalPassage);
    this.switchModeEvent.emit(Mode.View);
  }
}
