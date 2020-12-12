import { Component, Input, OnInit } from '@angular/core';
import { Passage } from '../passage.model';

enum Mode {
  View = 'view',
  Edit = 'edit'
}

@Component({
  selector: 'app-passage-item',
  templateUrl: './passage-item.component.html',
  styleUrls: ['./passage-item.component.scss']
})
export class PassageItemComponent implements OnInit {


  @Input() passage: Passage;
  mode = Mode.View;

  constructor() { }

  editPassage() { this.mode = Mode.Edit; }

  ngOnInit(): void {
  }

}
