import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnlayerComponent } from './unlayer.component';

describe('UnlayerComponent', () => {
  let component: UnlayerComponent;
  let fixture: ComponentFixture<UnlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnlayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
