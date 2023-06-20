import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DeliveryTermDetailComponent } from './delivery-term-detail.component';

describe('DeliveryTerm Management Detail Component', () => {
  let comp: DeliveryTermDetailComponent;
  let fixture: ComponentFixture<DeliveryTermDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeliveryTermDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ deliveryTerm: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(DeliveryTermDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DeliveryTermDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load deliveryTerm on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.deliveryTerm).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
