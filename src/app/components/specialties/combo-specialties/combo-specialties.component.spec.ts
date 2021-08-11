import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboSpecialtiesComponent } from './combo-specialties.component';

describe('ComboSpecialtiesComponent', () => {
  let component: ComboSpecialtiesComponent;
  let fixture: ComponentFixture<ComboSpecialtiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComboSpecialtiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboSpecialtiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
