import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitePlayerComponent } from './activite-player.component';

describe('ActivitePlayerComponent', () => {
  let component: ActivitePlayerComponent;
  let fixture: ComponentFixture<ActivitePlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitePlayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
