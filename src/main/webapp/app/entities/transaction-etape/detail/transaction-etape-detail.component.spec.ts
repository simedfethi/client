import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TransactionEtapeDetailComponent } from './transaction-etape-detail.component';

describe('TransactionEtape Management Detail Component', () => {
  let comp: TransactionEtapeDetailComponent;
  let fixture: ComponentFixture<TransactionEtapeDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionEtapeDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ transactionEtape: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(TransactionEtapeDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TransactionEtapeDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load transactionEtape on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.transactionEtape).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
