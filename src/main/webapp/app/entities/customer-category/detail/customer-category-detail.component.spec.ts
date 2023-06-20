import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CustomerCategoryDetailComponent } from './customer-category-detail.component';

describe('CustomerCategory Management Detail Component', () => {
  let comp: CustomerCategoryDetailComponent;
  let fixture: ComponentFixture<CustomerCategoryDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerCategoryDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ customerCategory: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CustomerCategoryDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CustomerCategoryDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load customerCategory on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.customerCategory).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
