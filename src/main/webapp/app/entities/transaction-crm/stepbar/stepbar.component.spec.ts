import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepbarComponent } from './stepbar.component';

describe('StepbarComponent', () => {
  let component: StepbarComponent;
  let fixture: ComponentFixture<StepbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
