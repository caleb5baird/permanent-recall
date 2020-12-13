import { Component, Input, OnInit } from '@angular/core';
import { Passage, Mode } from '../passage.model';

@Component({
  selector: 'app-passage-item',
  templateUrl: './passage-item.component.html',
  styleUrls: ['./passage-item.component.scss']
})
export class PassageItemComponent implements OnInit {


  @Input() passage: Passage;
  @Input() mode: Mode;

  constructor() { }

  editPassage() { this.mode = Mode.Edit; }

  ngOnInit(): void {}

  switchMode($event) {
    this.mode = $event;
  }

}
