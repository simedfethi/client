import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavnxComponent } from './navnx.component';

describe('NavnxComponent', () => {
  let component: NavnxComponent;
  let fixture: ComponentFixture<NavnxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavnxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavnxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
