import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarnxComponent } from './sidebarnx.component';

describe('SidebarnxComponent', () => {
  let component: SidebarnxComponent;
  let fixture: ComponentFixture<SidebarnxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarnxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarnxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
