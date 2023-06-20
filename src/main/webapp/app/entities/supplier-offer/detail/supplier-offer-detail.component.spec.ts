import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SupplierOfferDetailComponent } from './supplier-offer-detail.component';

describe('SupplierOffer Management Detail Component', () => {
  let comp: SupplierOfferDetailComponent;
  let fixture: ComponentFixture<SupplierOfferDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierOfferDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ supplierOffer: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(SupplierOfferDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(SupplierOfferDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load supplierOffer on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.supplierOffer).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
