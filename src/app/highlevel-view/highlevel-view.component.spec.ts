import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlevelViewComponent } from './highlevel-view.component';

describe('HighlevelViewComponent', () => {
  let component: HighlevelViewComponent;
  let fixture: ComponentFixture<HighlevelViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighlevelViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlevelViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
