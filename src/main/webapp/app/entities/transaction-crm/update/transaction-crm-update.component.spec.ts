import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TransactionCRMFormService } from './transaction-crm-form.service';
import { TransactionCRMService } from '../service/transaction-crm.service';
import { ITransactionCRM } from '../transaction-crm.model';
import { IMonnaie } from 'app/entities/monnaie/monnaie.model';
import { MonnaieService } from 'app/entities/monnaie/service/monnaie.service';
import { IEmployee } from 'app/entities/employee/employee.model';
import { EmployeeService } from 'app/entities/employee/service/employee.service';
import { ICustomer } from 'app/entities/customer/customer.model';
import { CustomerService } from 'app/entities/customer/service/customer.service';
import { IActivite } from 'app/entities/activite/activite.model';
import { ActiviteService } from 'app/entities/activite/service/activite.service';

import { TransactionCRMUpdateComponent } from './transaction-crm-update.component';

describe('TransactionCRM Management Update Component', () => {
  let comp: TransactionCRMUpdateComponent;
  let fixture: ComponentFixture<TransactionCRMUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let transactionCRMFormService: TransactionCRMFormService;
  let transactionCRMService: TransactionCRMService;
  let monnaieService: MonnaieService;
  let employeeService: EmployeeService;
  let customerService: CustomerService;
  let activiteService: ActiviteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TransactionCRMUpdateComponent],
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
      .overrideTemplate(TransactionCRMUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TransactionCRMUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    transactionCRMFormService = TestBed.inject(TransactionCRMFormService);
    transactionCRMService = TestBed.inject(TransactionCRMService);
    monnaieService = TestBed.inject(MonnaieService);
    employeeService = TestBed.inject(EmployeeService);
    customerService = TestBed.inject(CustomerService);
    activiteService = TestBed.inject(ActiviteService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Monnaie query and add missing value', () => {
      const transactionCRM: ITransactionCRM = { id: 456 };
      const monnaie: IMonnaie = { id: 32672 };
      transactionCRM.monnaie = monnaie;

      const monnaieCollection: IMonnaie[] = [{ id: 93620 }];
      jest.spyOn(monnaieService, 'query').mockReturnValue(of(new HttpResponse({ body: monnaieCollection })));
      const additionalMonnaies = [monnaie];
      const expectedCollection: IMonnaie[] = [...additionalMonnaies, ...monnaieCollection];
      jest.spyOn(monnaieService, 'addMonnaieToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ transactionCRM });
      comp.ngOnInit();

      expect(monnaieService.query).toHaveBeenCalled();
      expect(monnaieService.addMonnaieToCollectionIfMissing).toHaveBeenCalledWith(
        monnaieCollection,
        ...additionalMonnaies.map(expect.objectContaining)
      );
      expect(comp.monnaiesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Employee query and add missing value', () => {
      const transactionCRM: ITransactionCRM = { id: 456 };
      const chargeAffaire: IEmployee = { id: 80134 };
      transactionCRM.chargeAffaire = chargeAffaire;

      const employeeCollection: IEmployee[] = [{ id: 79010 }];
      jest.spyOn(employeeService, 'query').mockReturnValue(of(new HttpResponse({ body: employeeCollection })));
      const additionalEmployees = [chargeAffaire];
      const expectedCollection: IEmployee[] = [...additionalEmployees, ...employeeCollection];
      jest.spyOn(employeeService, 'addEmployeeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ transactionCRM });
      comp.ngOnInit();

      expect(employeeService.query).toHaveBeenCalled();
      expect(employeeService.addEmployeeToCollectionIfMissing).toHaveBeenCalledWith(
        employeeCollection,
        ...additionalEmployees.map(expect.objectContaining)
      );
      expect(comp.employeesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Customer query and add missing value', () => {
      const transactionCRM: ITransactionCRM = { id: 456 };
      const client: ICustomer = { id: 33016 };
      transactionCRM.client = client;

      const customerCollection: ICustomer[] = [{ id: 1509 }];
      jest.spyOn(customerService, 'query').mockReturnValue(of(new HttpResponse({ body: customerCollection })));
      const additionalCustomers = [client];
      const expectedCollection: ICustomer[] = [...additionalCustomers, ...customerCollection];
      jest.spyOn(customerService, 'addCustomerToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ transactionCRM });
      comp.ngOnInit();

      expect(customerService.query).toHaveBeenCalled();
      expect(customerService.addCustomerToCollectionIfMissing).toHaveBeenCalledWith(
        customerCollection,
        ...additionalCustomers.map(expect.objectContaining)
      );
      expect(comp.customersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Activite query and add missing value', () => {
      const transactionCRM: ITransactionCRM = { id: 456 };
      const activites: IActivite[] = [{ id: 95531 }];
      transactionCRM.activites = activites;

      const activiteCollection: IActivite[] = [{ id: 30047 }];
      jest.spyOn(activiteService, 'query').mockReturnValue(of(new HttpResponse({ body: activiteCollection })));
      const additionalActivites = [...activites];
      const expectedCollection: IActivite[] = [...additionalActivites, ...activiteCollection];
      jest.spyOn(activiteService, 'addActiviteToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ transactionCRM });
      comp.ngOnInit();

      expect(activiteService.query).toHaveBeenCalled();
      expect(activiteService.addActiviteToCollectionIfMissing).toHaveBeenCalledWith(
        activiteCollection,
        ...additionalActivites.map(expect.objectContaining)
      );
      expect(comp.activitesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const transactionCRM: ITransactionCRM = { id: 456 };
      const monnaie: IMonnaie = { id: 57061 };
      transactionCRM.monnaie = monnaie;
      const chargeAffaire: IEmployee = { id: 13544 };
      transactionCRM.chargeAffaire = chargeAffaire;
      const client: ICustomer = { id: 7947 };
      transactionCRM.client = client;
      const activite: IActivite = { id: 10714 };
      transactionCRM.activites = [activite];

      activatedRoute.data = of({ transactionCRM });
      comp.ngOnInit();

      expect(comp.monnaiesSharedCollection).toContain(monnaie);
      expect(comp.employeesSharedCollection).toContain(chargeAffaire);
      expect(comp.customersSharedCollection).toContain(client);
      expect(comp.activitesSharedCollection).toContain(activite);
      expect(comp.transactionCRM).toEqual(transactionCRM);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITransactionCRM>>();
      const transactionCRM = { id: 123 };
      jest.spyOn(transactionCRMFormService, 'getTransactionCRM').mockReturnValue(transactionCRM);
      jest.spyOn(transactionCRMService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ transactionCRM });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: transactionCRM }));
      saveSubject.complete();

      // THEN
      expect(transactionCRMFormService.getTransactionCRM).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(transactionCRMService.update).toHaveBeenCalledWith(expect.objectContaining(transactionCRM));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITransactionCRM>>();
      const transactionCRM = { id: 123 };
      jest.spyOn(transactionCRMFormService, 'getTransactionCRM').mockReturnValue({ id: null });
      jest.spyOn(transactionCRMService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ transactionCRM: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: transactionCRM }));
      saveSubject.complete();

      // THEN
      expect(transactionCRMFormService.getTransactionCRM).toHaveBeenCalled();
      expect(transactionCRMService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITransactionCRM>>();
      const transactionCRM = { id: 123 };
      jest.spyOn(transactionCRMService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ transactionCRM });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(transactionCRMService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareMonnaie', () => {
      it('Should forward to monnaieService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(monnaieService, 'compareMonnaie');
        comp.compareMonnaie(entity, entity2);
        expect(monnaieService.compareMonnaie).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareEmployee', () => {
      it('Should forward to employeeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(employeeService, 'compareEmployee');
        comp.compareEmployee(entity, entity2);
        expect(employeeService.compareEmployee).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareCustomer', () => {
      it('Should forward to customerService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(customerService, 'compareCustomer');
        comp.compareCustomer(entity, entity2);
        expect(customerService.compareCustomer).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareActivite', () => {
      it('Should forward to activiteService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(activiteService, 'compareActivite');
        comp.compareActivite(entity, entity2);
        expect(activiteService.compareActivite).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
