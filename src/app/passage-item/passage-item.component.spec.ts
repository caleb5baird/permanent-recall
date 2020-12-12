import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassageItemComponent } from './passage-item.component';

describe('PassageItemComponent', () => {
  let component: PassageItemComponent;
  let fixture: ComponentFixture<PassageItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassageItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassageItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
