import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHoursComponent } from './list-hours.component';

describe('ListHoursComponent', () => {
  let component: ListHoursComponent;
  let fixture: ComponentFixture<ListHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListHoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
