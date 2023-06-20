import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TransactionCRMDetailComponent } from './transaction-crm-detail.component';

describe('TransactionCRM Management Detail Component', () => {
  let comp: TransactionCRMDetailComponent;
  let fixture: ComponentFixture<TransactionCRMDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionCRMDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ transactionCRM: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(TransactionCRMDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TransactionCRMDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load transactionCRM on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.transactionCRM).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
