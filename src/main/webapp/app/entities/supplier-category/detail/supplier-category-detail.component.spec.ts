import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SupplierCategoryDetailComponent } from './supplier-category-detail.component';

describe('SupplierCategory Management Detail Component', () => {
  let comp: SupplierCategoryDetailComponent;
  let fixture: ComponentFixture<SupplierCategoryDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierCategoryDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ supplierCategory: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(SupplierCategoryDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(SupplierCategoryDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load supplierCategory on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.supplierCategory).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
