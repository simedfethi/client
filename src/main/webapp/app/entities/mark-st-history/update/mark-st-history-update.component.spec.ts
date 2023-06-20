import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { MarkStHistoryFormService } from './mark-st-history-form.service';
import { MarkStHistoryService } from '../service/mark-st-history.service';
import { IMarkStHistory } from '../mark-st-history.model';
import { IEmployee } from 'app/entities/employee/employee.model';
import { EmployeeService } from 'app/entities/employee/service/employee.service';
import { ITransactionCRM } from 'app/entities/transaction-crm/transaction-crm.model';
import { TransactionCRMService } from 'app/entities/transaction-crm/service/transaction-crm.service';
import { ITransactionEtape } from 'app/entities/transaction-etape/transaction-etape.model';
import { TransactionEtapeService } from 'app/entities/transaction-etape/service/transaction-etape.service';

import { MarkStHistoryUpdateComponent } from './mark-st-history-update.component';

describe('MarkStHistory Management Update Component', () => {
  let comp: MarkStHistoryUpdateComponent;
  let fixture: ComponentFixture<MarkStHistoryUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let markStHistoryFormService: MarkStHistoryFormService;
  let markStHistoryService: MarkStHistoryService;
  let employeeService: EmployeeService;
  let transactionCRMService: TransactionCRMService;
  let transactionEtapeService: TransactionEtapeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [MarkStHistoryUpdateComponent],
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
      .overrideTemplate(MarkStHistoryUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MarkStHistoryUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    markStHistoryFormService = TestBed.inject(MarkStHistoryFormService);
    markStHistoryService = TestBed.inject(MarkStHistoryService);
    employeeService = TestBed.inject(EmployeeService);
    transactionCRMService = TestBed.inject(TransactionCRMService);
    transactionEtapeService = TestBed.inject(TransactionEtapeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Employee query and add missing value', () => {
      const markStHistory: IMarkStHistory = { id: 456 };
      const createdby: IEmployee = { id: 66913 };
      markStHistory.createdby = createdby;

      const employeeCollection: IEmployee[] = [{ id: 8842 }];
      jest.spyOn(employeeService, 'query').mockReturnValue(of(new HttpResponse({ body: employeeCollection })));
      const additionalEmployees = [createdby];
      const expectedCollection: IEmployee[] = [...additionalEmployees, ...employeeCollection];
      jest.spyOn(employeeService, 'addEmployeeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ markStHistory });
      comp.ngOnInit();

      expect(employeeService.query).toHaveBeenCalled();
      expect(employeeService.addEmployeeToCollectionIfMissing).toHaveBeenCalledWith(
        employeeCollection,
        ...additionalEmployees.map(expect.objectContaining)
      );
      expect(comp.employeesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call TransactionCRM query and add missing value', () => {
      const markStHistory: IMarkStHistory = { id: 456 };
      const transactionCRM: ITransactionCRM = { id: 3999 };
      markStHistory.transactionCRM = transactionCRM;

      const transactionCRMCollection: ITransactionCRM[] = [{ id: 91191 }];
      jest.spyOn(transactionCRMService, 'query').mockReturnValue(of(new HttpResponse({ body: transactionCRMCollection })));
      const additionalTransactionCRMS = [transactionCRM];
      const expectedCollection: ITransactionCRM[] = [...additionalTransactionCRMS, ...transactionCRMCollection];
      jest.spyOn(transactionCRMService, 'addTransactionCRMToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ markStHistory });
      comp.ngOnInit();

      expect(transactionCRMService.query).toHaveBeenCalled();
      expect(transactionCRMService.addTransactionCRMToCollectionIfMissing).toHaveBeenCalledWith(
        transactionCRMCollection,
        ...additionalTransactionCRMS.map(expect.objectContaining)
      );
      expect(comp.transactionCRMSSharedCollection).toEqual(expectedCollection);
    });

    it('Should call TransactionEtape query and add missing value', () => {
      const markStHistory: IMarkStHistory = { id: 456 };
      const trEtape: ITransactionEtape = { id: 68801 };
      markStHistory.trEtape = trEtape;

      const transactionEtapeCollection: ITransactionEtape[] = [{ id: 19504 }];
      jest.spyOn(transactionEtapeService, 'query').mockReturnValue(of(new HttpResponse({ body: transactionEtapeCollection })));
      const additionalTransactionEtapes = [trEtape];
      const expectedCollection: ITransactionEtape[] = [...additionalTransactionEtapes, ...transactionEtapeCollection];
      jest.spyOn(transactionEtapeService, 'addTransactionEtapeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ markStHistory });
      comp.ngOnInit();

      expect(transactionEtapeService.query).toHaveBeenCalled();
      expect(transactionEtapeService.addTransactionEtapeToCollectionIfMissing).toHaveBeenCalledWith(
        transactionEtapeCollection,
        ...additionalTransactionEtapes.map(expect.objectContaining)
      );
      expect(comp.transactionEtapesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const markStHistory: IMarkStHistory = { id: 456 };
      const createdby: IEmployee = { id: 26992 };
      markStHistory.createdby = createdby;
      const transactionCRM: ITransactionCRM = { id: 56570 };
      markStHistory.transactionCRM = transactionCRM;
      const trEtape: ITransactionEtape = { id: 78588 };
      markStHistory.trEtape = trEtape;

      activatedRoute.data = of({ markStHistory });
      comp.ngOnInit();

      expect(comp.employeesSharedCollection).toContain(createdby);
      expect(comp.transactionCRMSSharedCollection).toContain(transactionCRM);
      expect(comp.transactionEtapesSharedCollection).toContain(trEtape);
      expect(comp.markStHistory).toEqual(markStHistory);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMarkStHistory>>();
      const markStHistory = { id: 123 };
      jest.spyOn(markStHistoryFormService, 'getMarkStHistory').mockReturnValue(markStHistory);
      jest.spyOn(markStHistoryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ markStHistory });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: markStHistory }));
      saveSubject.complete();

      // THEN
      expect(markStHistoryFormService.getMarkStHistory).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(markStHistoryService.update).toHaveBeenCalledWith(expect.objectContaining(markStHistory));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMarkStHistory>>();
      const markStHistory = { id: 123 };
      jest.spyOn(markStHistoryFormService, 'getMarkStHistory').mockReturnValue({ id: null });
      jest.spyOn(markStHistoryService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ markStHistory: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: markStHistory }));
      saveSubject.complete();

      // THEN
      expect(markStHistoryFormService.getMarkStHistory).toHaveBeenCalled();
      expect(markStHistoryService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMarkStHistory>>();
      const markStHistory = { id: 123 };
      jest.spyOn(markStHistoryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ markStHistory });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(markStHistoryService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareEmployee', () => {
      it('Should forward to employeeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(employeeService, 'compareEmployee');
        comp.compareEmployee(entity, entity2);
        expect(employeeService.compareEmployee).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareTransactionCRM', () => {
      it('Should forward to transactionCRMService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(transactionCRMService, 'compareTransactionCRM');
        comp.compareTransactionCRM(entity, entity2);
        expect(transactionCRMService.compareTransactionCRM).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareTransactionEtape', () => {
      it('Should forward to transactionEtapeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(transactionEtapeService, 'compareTransactionEtape');
        comp.compareTransactionEtape(entity, entity2);
        expect(transactionEtapeService.compareTransactionEtape).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
