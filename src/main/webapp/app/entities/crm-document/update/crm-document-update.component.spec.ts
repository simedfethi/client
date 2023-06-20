import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CrmDocumentFormService } from './crm-document-form.service';
import { CrmDocumentService } from '../service/crm-document.service';
import { ICrmDocument } from '../crm-document.model';
import { ITransporter } from 'app/entities/transporter/transporter.model';
import { TransporterService } from 'app/entities/transporter/service/transporter.service';
import { ITransportUnit } from 'app/entities/transport-unit/transport-unit.model';
import { TransportUnitService } from 'app/entities/transport-unit/service/transport-unit.service';
import { ICrmDocType } from 'app/entities/crm-doc-type/crm-doc-type.model';
import { CrmDocTypeService } from 'app/entities/crm-doc-type/service/crm-doc-type.service';
import { IEmployee } from 'app/entities/employee/employee.model';
import { EmployeeService } from 'app/entities/employee/service/employee.service';
import { ICustomer } from 'app/entities/customer/customer.model';
import { CustomerService } from 'app/entities/customer/service/customer.service';
import { ICrmContact } from 'app/entities/crm-contact/crm-contact.model';
import { CrmContactService } from 'app/entities/crm-contact/service/crm-contact.service';
import { ITransactionCRM } from 'app/entities/transaction-crm/transaction-crm.model';
import { TransactionCRMService } from 'app/entities/transaction-crm/service/transaction-crm.service';

import { CrmDocumentUpdateComponent } from './crm-document-update.component';

describe('CrmDocument Management Update Component', () => {
  let comp: CrmDocumentUpdateComponent;
  let fixture: ComponentFixture<CrmDocumentUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let crmDocumentFormService: CrmDocumentFormService;
  let crmDocumentService: CrmDocumentService;
  let transporterService: TransporterService;
  let transportUnitService: TransportUnitService;
  let crmDocTypeService: CrmDocTypeService;
  let employeeService: EmployeeService;
  let customerService: CustomerService;
  let crmContactService: CrmContactService;
  let transactionCRMService: TransactionCRMService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CrmDocumentUpdateComponent],
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
      .overrideTemplate(CrmDocumentUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CrmDocumentUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    crmDocumentFormService = TestBed.inject(CrmDocumentFormService);
    crmDocumentService = TestBed.inject(CrmDocumentService);
    transporterService = TestBed.inject(TransporterService);
    transportUnitService = TestBed.inject(TransportUnitService);
    crmDocTypeService = TestBed.inject(CrmDocTypeService);
    employeeService = TestBed.inject(EmployeeService);
    customerService = TestBed.inject(CustomerService);
    crmContactService = TestBed.inject(CrmContactService);
    transactionCRMService = TestBed.inject(TransactionCRMService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Transporter query and add missing value', () => {
      const crmDocument: ICrmDocument = { id: 456 };
      const transporteur: ITransporter = { id: 62335 };
      crmDocument.transporteur = transporteur;

      const transporterCollection: ITransporter[] = [{ id: 8660 }];
      jest.spyOn(transporterService, 'query').mockReturnValue(of(new HttpResponse({ body: transporterCollection })));
      const additionalTransporters = [transporteur];
      const expectedCollection: ITransporter[] = [...additionalTransporters, ...transporterCollection];
      jest.spyOn(transporterService, 'addTransporterToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ crmDocument });
      comp.ngOnInit();

      expect(transporterService.query).toHaveBeenCalled();
      expect(transporterService.addTransporterToCollectionIfMissing).toHaveBeenCalledWith(
        transporterCollection,
        ...additionalTransporters.map(expect.objectContaining)
      );
      expect(comp.transportersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call TransportUnit query and add missing value', () => {
      const crmDocument: ICrmDocument = { id: 456 };
      const transportunit: ITransportUnit = { id: 44352 };
      crmDocument.transportunit = transportunit;

      const transportUnitCollection: ITransportUnit[] = [{ id: 91591 }];
      jest.spyOn(transportUnitService, 'query').mockReturnValue(of(new HttpResponse({ body: transportUnitCollection })));
      const additionalTransportUnits = [transportunit];
      const expectedCollection: ITransportUnit[] = [...additionalTransportUnits, ...transportUnitCollection];
      jest.spyOn(transportUnitService, 'addTransportUnitToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ crmDocument });
      comp.ngOnInit();

      expect(transportUnitService.query).toHaveBeenCalled();
      expect(transportUnitService.addTransportUnitToCollectionIfMissing).toHaveBeenCalledWith(
        transportUnitCollection,
        ...additionalTransportUnits.map(expect.objectContaining)
      );
      expect(comp.transportUnitsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call CrmDocType query and add missing value', () => {
      const crmDocument: ICrmDocument = { id: 456 };
      const crmdoctype: ICrmDocType = { id: 37867 };
      crmDocument.crmdoctype = crmdoctype;

      const crmDocTypeCollection: ICrmDocType[] = [{ id: 92497 }];
      jest.spyOn(crmDocTypeService, 'query').mockReturnValue(of(new HttpResponse({ body: crmDocTypeCollection })));
      const additionalCrmDocTypes = [crmdoctype];
      const expectedCollection: ICrmDocType[] = [...additionalCrmDocTypes, ...crmDocTypeCollection];
      jest.spyOn(crmDocTypeService, 'addCrmDocTypeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ crmDocument });
      comp.ngOnInit();

      expect(crmDocTypeService.query).toHaveBeenCalled();
      expect(crmDocTypeService.addCrmDocTypeToCollectionIfMissing).toHaveBeenCalledWith(
        crmDocTypeCollection,
        ...additionalCrmDocTypes.map(expect.objectContaining)
      );
      expect(comp.crmDocTypesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Employee query and add missing value', () => {
      const crmDocument: ICrmDocument = { id: 456 };
      const createdBy: IEmployee = { id: 87572 };
      crmDocument.createdBy = createdBy;

      const employeeCollection: IEmployee[] = [{ id: 22939 }];
      jest.spyOn(employeeService, 'query').mockReturnValue(of(new HttpResponse({ body: employeeCollection })));
      const additionalEmployees = [createdBy];
      const expectedCollection: IEmployee[] = [...additionalEmployees, ...employeeCollection];
      jest.spyOn(employeeService, 'addEmployeeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ crmDocument });
      comp.ngOnInit();

      expect(employeeService.query).toHaveBeenCalled();
      expect(employeeService.addEmployeeToCollectionIfMissing).toHaveBeenCalledWith(
        employeeCollection,
        ...additionalEmployees.map(expect.objectContaining)
      );
      expect(comp.employeesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Customer query and add missing value', () => {
      const crmDocument: ICrmDocument = { id: 456 };
      const customer: ICustomer = { id: 24692 };
      crmDocument.customer = customer;

      const customerCollection: ICustomer[] = [{ id: 29696 }];
      jest.spyOn(customerService, 'query').mockReturnValue(of(new HttpResponse({ body: customerCollection })));
      const additionalCustomers = [customer];
      const expectedCollection: ICustomer[] = [...additionalCustomers, ...customerCollection];
      jest.spyOn(customerService, 'addCustomerToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ crmDocument });
      comp.ngOnInit();

      expect(customerService.query).toHaveBeenCalled();
      expect(customerService.addCustomerToCollectionIfMissing).toHaveBeenCalledWith(
        customerCollection,
        ...additionalCustomers.map(expect.objectContaining)
      );
      expect(comp.customersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call CrmContact query and add missing value', () => {
      const crmDocument: ICrmDocument = { id: 456 };
      const crmContact: ICrmContact = { id: 46732 };
      crmDocument.crmContact = crmContact;

      const crmContactCollection: ICrmContact[] = [{ id: 5239 }];
      jest.spyOn(crmContactService, 'query').mockReturnValue(of(new HttpResponse({ body: crmContactCollection })));
      const additionalCrmContacts = [crmContact];
      const expectedCollection: ICrmContact[] = [...additionalCrmContacts, ...crmContactCollection];
      jest.spyOn(crmContactService, 'addCrmContactToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ crmDocument });
      comp.ngOnInit();

      expect(crmContactService.query).toHaveBeenCalled();
      expect(crmContactService.addCrmContactToCollectionIfMissing).toHaveBeenCalledWith(
        crmContactCollection,
        ...additionalCrmContacts.map(expect.objectContaining)
      );
      expect(comp.crmContactsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call TransactionCRM query and add missing value', () => {
      const crmDocument: ICrmDocument = { id: 456 };
      const transactionCRM: ITransactionCRM = { id: 63298 };
      crmDocument.transactionCRM = transactionCRM;

      const transactionCRMCollection: ITransactionCRM[] = [{ id: 10771 }];
      jest.spyOn(transactionCRMService, 'query').mockReturnValue(of(new HttpResponse({ body: transactionCRMCollection })));
      const additionalTransactionCRMS = [transactionCRM];
      const expectedCollection: ITransactionCRM[] = [...additionalTransactionCRMS, ...transactionCRMCollection];
      jest.spyOn(transactionCRMService, 'addTransactionCRMToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ crmDocument });
      comp.ngOnInit();

      expect(transactionCRMService.query).toHaveBeenCalled();
      expect(transactionCRMService.addTransactionCRMToCollectionIfMissing).toHaveBeenCalledWith(
        transactionCRMCollection,
        ...additionalTransactionCRMS.map(expect.objectContaining)
      );
      expect(comp.transactionCRMSSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const crmDocument: ICrmDocument = { id: 456 };
      const transporteur: ITransporter = { id: 7440 };
      crmDocument.transporteur = transporteur;
      const transportunit: ITransportUnit = { id: 44080 };
      crmDocument.transportunit = transportunit;
      const crmdoctype: ICrmDocType = { id: 51894 };
      crmDocument.crmdoctype = crmdoctype;
      const createdBy: IEmployee = { id: 91616 };
      crmDocument.createdBy = createdBy;
      const customer: ICustomer = { id: 61917 };
      crmDocument.customer = customer;
      const crmContact: ICrmContact = { id: 52000 };
      crmDocument.crmContact = crmContact;
      const transactionCRM: ITransactionCRM = { id: 25828 };
      crmDocument.transactionCRM = transactionCRM;

      activatedRoute.data = of({ crmDocument });
      comp.ngOnInit();

      expect(comp.transportersSharedCollection).toContain(transporteur);
      expect(comp.transportUnitsSharedCollection).toContain(transportunit);
      expect(comp.crmDocTypesSharedCollection).toContain(crmdoctype);
      expect(comp.employeesSharedCollection).toContain(createdBy);
      expect(comp.customersSharedCollection).toContain(customer);
      expect(comp.crmContactsSharedCollection).toContain(crmContact);
      expect(comp.transactionCRMSSharedCollection).toContain(transactionCRM);
      expect(comp.crmDocument).toEqual(crmDocument);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmDocument>>();
      const crmDocument = { id: 123 };
      jest.spyOn(crmDocumentFormService, 'getCrmDocument').mockReturnValue(crmDocument);
      jest.spyOn(crmDocumentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmDocument });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crmDocument }));
      saveSubject.complete();

      // THEN
      expect(crmDocumentFormService.getCrmDocument).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(crmDocumentService.update).toHaveBeenCalledWith(expect.objectContaining(crmDocument));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmDocument>>();
      const crmDocument = { id: 123 };
      jest.spyOn(crmDocumentFormService, 'getCrmDocument').mockReturnValue({ id: null });
      jest.spyOn(crmDocumentService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmDocument: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crmDocument }));
      saveSubject.complete();

      // THEN
      expect(crmDocumentFormService.getCrmDocument).toHaveBeenCalled();
      expect(crmDocumentService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmDocument>>();
      const crmDocument = { id: 123 };
      jest.spyOn(crmDocumentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmDocument });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(crmDocumentService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareTransporter', () => {
      it('Should forward to transporterService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(transporterService, 'compareTransporter');
        comp.compareTransporter(entity, entity2);
        expect(transporterService.compareTransporter).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareTransportUnit', () => {
      it('Should forward to transportUnitService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(transportUnitService, 'compareTransportUnit');
        comp.compareTransportUnit(entity, entity2);
        expect(transportUnitService.compareTransportUnit).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareCrmDocType', () => {
      it('Should forward to crmDocTypeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(crmDocTypeService, 'compareCrmDocType');
        comp.compareCrmDocType(entity, entity2);
        expect(crmDocTypeService.compareCrmDocType).toHaveBeenCalledWith(entity, entity2);
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
  });
});
