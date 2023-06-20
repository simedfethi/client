import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ActiviteFormService } from './activite-form.service';
import { ActiviteService } from '../service/activite.service';
import { IActivite } from '../activite.model';
import { ICustomer } from 'app/entities/customer/customer.model';
import { CustomerService } from 'app/entities/customer/service/customer.service';
import { ICrmContact } from 'app/entities/crm-contact/crm-contact.model';
import { CrmContactService } from 'app/entities/crm-contact/service/crm-contact.service';
import { ITransactionCRM } from 'app/entities/transaction-crm/transaction-crm.model';
import { TransactionCRMService } from 'app/entities/transaction-crm/service/transaction-crm.service';
import { IEmployee } from 'app/entities/employee/employee.model';
import { EmployeeService } from 'app/entities/employee/service/employee.service';

import { ActiviteUpdateComponent } from './activite-update.component';

describe('Activite Management Update Component', () => {
  let comp: ActiviteUpdateComponent;
  let fixture: ComponentFixture<ActiviteUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let activiteFormService: ActiviteFormService;
  let activiteService: ActiviteService;
  let customerService: CustomerService;
  let crmContactService: CrmContactService;
  let transactionCRMService: TransactionCRMService;
  let employeeService: EmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ActiviteUpdateComponent],
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
      .overrideTemplate(ActiviteUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ActiviteUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    activiteFormService = TestBed.inject(ActiviteFormService);
    activiteService = TestBed.inject(ActiviteService);
    customerService = TestBed.inject(CustomerService);
    crmContactService = TestBed.inject(CrmContactService);
    transactionCRMService = TestBed.inject(TransactionCRMService);
    employeeService = TestBed.inject(EmployeeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Customer query and add missing value', () => {
      const activite: IActivite = { id: 456 };
      const client: ICustomer = { id: 91960 };
      activite.client = client;

      const customerCollection: ICustomer[] = [{ id: 50884 }];
      jest.spyOn(customerService, 'query').mockReturnValue(of(new HttpResponse({ body: customerCollection })));
      const additionalCustomers = [client];
      const expectedCollection: ICustomer[] = [...additionalCustomers, ...customerCollection];
      jest.spyOn(customerService, 'addCustomerToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ activite });
      comp.ngOnInit();

      expect(customerService.query).toHaveBeenCalled();
      expect(customerService.addCustomerToCollectionIfMissing).toHaveBeenCalledWith(
        customerCollection,
        ...additionalCustomers.map(expect.objectContaining)
      );
      expect(comp.customersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call CrmContact query and add missing value', () => {
      const activite: IActivite = { id: 456 };
      const crmContact: ICrmContact = { id: 64001 };
      activite.crmContact = crmContact;

      const crmContactCollection: ICrmContact[] = [{ id: 74930 }];
      jest.spyOn(crmContactService, 'query').mockReturnValue(of(new HttpResponse({ body: crmContactCollection })));
      const additionalCrmContacts = [crmContact];
      const expectedCollection: ICrmContact[] = [...additionalCrmContacts, ...crmContactCollection];
      jest.spyOn(crmContactService, 'addCrmContactToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ activite });
      comp.ngOnInit();

      expect(crmContactService.query).toHaveBeenCalled();
      expect(crmContactService.addCrmContactToCollectionIfMissing).toHaveBeenCalledWith(
        crmContactCollection,
        ...additionalCrmContacts.map(expect.objectContaining)
      );
      expect(comp.crmContactsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call TransactionCRM query and add missing value', () => {
      const activite: IActivite = { id: 456 };
      const transactionCRM: ITransactionCRM = { id: 92329 };
      activite.transactionCRM = transactionCRM;

      const transactionCRMCollection: ITransactionCRM[] = [{ id: 24817 }];
      jest.spyOn(transactionCRMService, 'query').mockReturnValue(of(new HttpResponse({ body: transactionCRMCollection })));
      const additionalTransactionCRMS = [transactionCRM];
      const expectedCollection: ITransactionCRM[] = [...additionalTransactionCRMS, ...transactionCRMCollection];
      jest.spyOn(transactionCRMService, 'addTransactionCRMToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ activite });
      comp.ngOnInit();

      expect(transactionCRMService.query).toHaveBeenCalled();
      expect(transactionCRMService.addTransactionCRMToCollectionIfMissing).toHaveBeenCalledWith(
        transactionCRMCollection,
        ...additionalTransactionCRMS.map(expect.objectContaining)
      );
      expect(comp.transactionCRMSSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Employee query and add missing value', () => {
      const activite: IActivite = { id: 456 };
      const employee: IEmployee = { id: 24548 };
      activite.employee = employee;
      const employeeIncluses: IEmployee[] = [{ id: 33227 }];
      activite.employeeIncluses = employeeIncluses;

      const employeeCollection: IEmployee[] = [{ id: 51580 }];
      jest.spyOn(employeeService, 'query').mockReturnValue(of(new HttpResponse({ body: employeeCollection })));
      const additionalEmployees = [employee, ...employeeIncluses];
      const expectedCollection: IEmployee[] = [...additionalEmployees, ...employeeCollection];
      jest.spyOn(employeeService, 'addEmployeeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ activite });
      comp.ngOnInit();

      expect(employeeService.query).toHaveBeenCalled();
      expect(employeeService.addEmployeeToCollectionIfMissing).toHaveBeenCalledWith(
        employeeCollection,
        ...additionalEmployees.map(expect.objectContaining)
      );
      expect(comp.employeesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const activite: IActivite = { id: 456 };
      const client: ICustomer = { id: 81842 };
      activite.client = client;
      const crmContact: ICrmContact = { id: 27513 };
      activite.crmContact = crmContact;
      const transactionCRM: ITransactionCRM = { id: 64604 };
      activite.transactionCRM = transactionCRM;
      const employee: IEmployee = { id: 50537 };
      activite.employee = employee;
      const employeeInclus: IEmployee = { id: 50158 };
      activite.employeeIncluses = [employeeInclus];

      activatedRoute.data = of({ activite });
      comp.ngOnInit();

      expect(comp.customersSharedCollection).toContain(client);
      expect(comp.crmContactsSharedCollection).toContain(crmContact);
      expect(comp.transactionCRMSSharedCollection).toContain(transactionCRM);
      expect(comp.employeesSharedCollection).toContain(employee);
      expect(comp.employeesSharedCollection).toContain(employeeInclus);
      expect(comp.activite).toEqual(activite);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IActivite>>();
      const activite = { id: 123 };
      jest.spyOn(activiteFormService, 'getActivite').mockReturnValue(activite);
      jest.spyOn(activiteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ activite });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: activite }));
      saveSubject.complete();

      // THEN
      expect(activiteFormService.getActivite).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(activiteService.update).toHaveBeenCalledWith(expect.objectContaining(activite));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IActivite>>();
      const activite = { id: 123 };
      jest.spyOn(activiteFormService, 'getActivite').mockReturnValue({ id: null });
      jest.spyOn(activiteService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ activite: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: activite }));
      saveSubject.complete();

      // THEN
      expect(activiteFormService.getActivite).toHaveBeenCalled();
      expect(activiteService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IActivite>>();
      const activite = { id: 123 };
      jest.spyOn(activiteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ activite });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(activiteService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCustomer', () => {
      it('Should forward to customerService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(customerService, 'compareCustomer');
        comp.compareCustomer(entity, entity2);
        expect(customerService.compareCustomer).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareCrmContact', () => {
      it('Should forward to crmContactService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(crmContactService, 'compareCrmContact');
        comp.compareCrmContact(entity, entity2);
        expect(crmContactService.compareCrmContact).toHaveBeenCalledWith(entity, entity2);
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

    describe('compareEmployee', () => {
      it('Should forward to employeeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(employeeService, 'compareEmployee');
        comp.compareEmployee(entity, entity2);
        expect(employeeService.compareEmployee).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
