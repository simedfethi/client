import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TransactionEtapeFormService } from './transaction-etape-form.service';
import { TransactionEtapeService } from '../service/transaction-etape.service';
import { ITransactionEtape } from '../transaction-etape.model';

import { TransactionEtapeUpdateComponent } from './transaction-etape-update.component';

describe('TransactionEtape Management Update Component', () => {
  let comp: TransactionEtapeUpdateComponent;
  let fixture: ComponentFixture<TransactionEtapeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let transactionEtapeFormService: TransactionEtapeFormService;
  let transactionEtapeService: TransactionEtapeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TransactionEtapeUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(TransactionEtapeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TransactionEtapeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    transactionEtapeFormService = TestBed.inject(TransactionEtapeFormService);
    transactionEtapeService = TestBed.inject(TransactionEtapeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const transactionEtape: ITransactionEtape = { id: 456 };

      activatedRoute.data = of({ transactionEtape });
      comp.ngOnInit();

      expect(comp.transactionEtape).toEqual(transactionEtape);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITransactionEtape>>();
      const transactionEtape = { id: 123 };
      jest.spyOn(transactionEtapeFormService, 'getTransactionEtape').mockReturnValue(transactionEtape);
      jest.spyOn(transactionEtapeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ transactionEtape });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: transactionEtape }));
      saveSubject.complete();

      // THEN
      expect(transactionEtapeFormService.getTransactionEtape).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(transactionEtapeService.update).toHaveBeenCalledWith(expect.objectContaining(transactionEtape));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITransactionEtape>>();
      const transactionEtape = { id: 123 };
      jest.spyOn(transactionEtapeFormService, 'getTransactionEtape').mockReturnValue({ id: null });
      jest.spyOn(transactionEtapeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ transactionEtape: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: transactionEtape }));
      saveSubject.complete();

      // THEN
      expect(transactionEtapeFormService.getTransactionEtape).toHaveBeenCalled();
      expect(transactionEtapeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITransactionEtape>>();
      const transactionEtape = { id: 123 };
      jest.spyOn(transactionEtapeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ transactionEtape });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(transactionEtapeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
