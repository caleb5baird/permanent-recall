import { Component, Input, OnInit } from '@angular/core';
import { Passage } from '../passage.model';

@Component({
  selector: 'app-create-passage',
  templateUrl: './create-passage.component.html',
  styleUrls: ['./create-passage.component.scss']
})
export class CreatePassageComponent implements OnInit {

  @Input() passage: Passage;

  constructor() { }

  ngOnInit(): void {}

}
