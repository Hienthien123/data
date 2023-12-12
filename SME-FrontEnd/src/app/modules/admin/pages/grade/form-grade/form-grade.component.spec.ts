import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGradeComponent } from './form-grade.component';

describe('FormGradeComponent', () => {
  let component: FormGradeComponent;
  let fixture: ComponentFixture<FormGradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormGradeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
