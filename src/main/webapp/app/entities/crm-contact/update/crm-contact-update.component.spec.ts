import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CrmContactFormService } from './crm-contact-form.service';
import { CrmContactService } from '../service/crm-contact.service';
import { ICrmContact } from '../crm-contact.model';
import { ICrmContactType } from 'app/entities/crm-contact-type/crm-contact-type.model';
import { CrmContactTypeService } from 'app/entities/crm-contact-type/service/crm-contact-type.service';
import { ICrmCOntactSource } from 'app/entities/crm-c-ontact-source/crm-c-ontact-source.model';
import { CrmCOntactSourceService } from 'app/entities/crm-c-ontact-source/service/crm-c-ontact-source.service';
import { IEmployee } from 'app/entities/employee/employee.model';
import { EmployeeService } from 'app/entities/employee/service/employee.service';
import { ICustomer } from 'app/entities/customer/customer.model';
import { CustomerService } from 'app/entities/customer/service/customer.service';

import { CrmContactUpdateComponent } from './crm-contact-update.component';

describe('CrmContact Management Update Component', () => {
  let comp: CrmContactUpdateComponent;
  let fixture: ComponentFixture<CrmContactUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let crmContactFormService: CrmContactFormService;
  let crmContactService: CrmContactService;
  let crmContactTypeService: CrmContactTypeService;
  let crmCOntactSourceService: CrmCOntactSourceService;
  let employeeService: EmployeeService;
  let customerService: CustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CrmContactUpdateComponent],
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
      .overrideTemplate(CrmContactUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CrmContactUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    crmContactFormService = TestBed.inject(CrmContactFormService);
    crmContactService = TestBed.inject(CrmContactService);
    crmContactTypeService = TestBed.inject(CrmContactTypeService);
    crmCOntactSourceService = TestBed.inject(CrmCOntactSourceService);
    employeeService = TestBed.inject(EmployeeService);
    customerService = TestBed.inject(CustomerService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call CrmContactType query and add missing value', () => {
      const crmContact: ICrmContact = { id: 456 };
      const contacttype: ICrmContactType = { id: 48620 };
      crmContact.contacttype = contacttype;

      const crmContactTypeCollection: ICrmContactType[] = [{ id: 64101 }];
      jest.spyOn(crmContactTypeService, 'query').mockReturnValue(of(new HttpResponse({ body: crmContactTypeCollection })));
      const additionalCrmContactTypes = [contacttype];
      const expectedCollection: ICrmContactType[] = [...additionalCrmContactTypes, ...crmContactTypeCollection];
      jest.spyOn(crmContactTypeService, 'addCrmContactTypeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ crmContact });
      comp.ngOnInit();

      expect(crmContactTypeService.query).toHaveBeenCalled();
      expect(crmContactTypeService.addCrmContactTypeToCollectionIfMissing).toHaveBeenCalledWith(
        crmContactTypeCollection,
        ...additionalCrmContactTypes.map(expect.objectContaining)
      );
      expect(comp.crmContactTypesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call CrmCOntactSource query and add missing value', () => {
      const crmContact: ICrmContact = { id: 456 };
      const crmContactSource: ICrmCOntactSource = { id: 75811 };
      crmContact.crmContactSource = crmContactSource;

      const crmCOntactSourceCollection: ICrmCOntactSource[] = [{ id: 54868 }];
      jest.spyOn(crmCOntactSourceService, 'query').mockReturnValue(of(new HttpResponse({ body: crmCOntactSourceCollection })));
      const additionalCrmCOntactSources = [crmContactSource];
      const expectedCollection: ICrmCOntactSource[] = [...additionalCrmCOntactSources, ...crmCOntactSourceCollection];
      jest.spyOn(crmCOntactSourceService, 'addCrmCOntactSourceToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ crmContact });
      comp.ngOnInit();

      expect(crmCOntactSourceService.query).toHaveBeenCalled();
      expect(crmCOntactSourceService.addCrmCOntactSourceToCollectionIfMissing).toHaveBeenCalledWith(
        crmCOntactSourceCollection,
        ...additionalCrmCOntactSources.map(expect.objectContaining)
      );
      expect(comp.crmCOntactSourcesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Employee query and add missing value', () => {
      const crmContact: ICrmContact = { id: 456 };
      const responsable: IEmployee = { id: 55025 };
      crmContact.responsable = responsable;

      const employeeCollection: IEmployee[] = [{ id: 97631 }];
      jest.spyOn(employeeService, 'query').mockReturnValue(of(new HttpResponse({ body: employeeCollection })));
      const additionalEmployees = [responsable];
      const expectedCollection: IEmployee[] = [...additionalEmployees, ...employeeCollection];
      jest.spyOn(employeeService, 'addEmployeeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ crmContact });
      comp.ngOnInit();

      expect(employeeService.query).toHaveBeenCalled();
      expect(employeeService.addEmployeeToCollectionIfMissing).toHaveBeenCalledWith(
        employeeCollection,
        ...additionalEmployees.map(expect.objectContaining)
      );
      expect(comp.employeesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Customer query and add missing value', () => {
      const crmContact: ICrmContact = { id: 456 };
      const societe: ICustomer = { id: 5433 };
      crmContact.societe = societe;

      const customerCollection: ICustomer[] = [{ id: 62431 }];
      jest.spyOn(customerService, 'query').mockReturnValue(of(new HttpResponse({ body: customerCollection })));
      const additionalCustomers = [societe];
      const expectedCollection: ICustomer[] = [...additionalCustomers, ...customerCollection];
      jest.spyOn(customerService, 'addCustomerToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ crmContact });
      comp.ngOnInit();

      expect(customerService.query).toHaveBeenCalled();
      expect(customerService.addCustomerToCollectionIfMissing).toHaveBeenCalledWith(
        customerCollection,
        ...additionalCustomers.map(expect.objectContaining)
      );
      expect(comp.customersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const crmContact: ICrmContact = { id: 456 };
      const contacttype: ICrmContactType = { id: 75420 };
      crmContact.contacttype = contacttype;
      const crmContactSource: ICrmCOntactSource = { id: 78535 };
      crmContact.crmContactSource = crmContactSource;
      const responsable: IEmployee = { id: 45688 };
      crmContact.responsable = responsable;
      const societe: ICustomer = { id: 36817 };
      crmContact.societe = societe;

      activatedRoute.data = of({ crmContact });
      comp.ngOnInit();

      expect(comp.crmContactTypesSharedCollection).toContain(contacttype);
      expect(comp.crmCOntactSourcesSharedCollection).toContain(crmContactSource);
      expect(comp.employeesSharedCollection).toContain(responsable);
      expect(comp.customersSharedCollection).toContain(societe);
      expect(comp.crmContact).toEqual(crmContact);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmContact>>();
      const crmContact = { id: 123 };
      jest.spyOn(crmContactFormService, 'getCrmContact').mockReturnValue(crmContact);
      jest.spyOn(crmContactService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmContact });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crmContact }));
      saveSubject.complete();

      // THEN
      expect(crmContactFormService.getCrmContact).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(crmContactService.update).toHaveBeenCalledWith(expect.objectContaining(crmContact));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmContact>>();
      const crmContact = { id: 123 };
      jest.spyOn(crmContactFormService, 'getCrmContact').mockReturnValue({ id: null });
      jest.spyOn(crmContactService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmContact: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crmContact }));
      saveSubject.complete();

      // THEN
      expect(crmContactFormService.getCrmContact).toHaveBeenCalled();
      expect(crmContactService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmContact>>();
      const crmContact = { id: 123 };
      jest.spyOn(crmContactService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmContact });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(crmContactService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCrmContactType', () => {
      it('Should forward to crmContactTypeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(crmContactTypeService, 'compareCrmContactType');
        comp.compareCrmContactType(entity, entity2);
        expect(crmContactTypeService.compareCrmContactType).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareCrmCOntactSource', () => {
      it('Should forward to crmCOntactSourceService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(crmCOntactSourceService, 'compareCrmCOntactSource');
        comp.compareCrmCOntactSource(entity, entity2);
        expect(crmCOntactSourceService.compareCrmCOntactSource).toHaveBeenCalledWith(entity, entity2);
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
  });
});
