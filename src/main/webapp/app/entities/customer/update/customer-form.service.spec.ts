import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../customer.test-samples';

import { CustomerFormService } from './customer-form.service';

describe('Customer Form Service', () => {
  let service: CustomerFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerFormService);
  });

  describe('Service methods', () => {
    describe('createCustomerFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCustomerFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            customerType: expect.any(Object),
            company: expect.any(Object),
            emailAddress: expect.any(Object),
            businessPhone: expect.any(Object),
            mobilePhone: expect.any(Object),
            faxNumber: expect.any(Object),
            caAnnual: expect.any(Object),
            addresse: expect.any(Object),
            wilaya: expect.any(Object),
            daira: expect.any(Object),
            codePostal: expect.any(Object),
            commune: expect.any(Object),
            webPage: expect.any(Object),
            notes: expect.any(Object),
            attachments: expect.any(Object),
            aboutSource: expect.any(Object),
            dejaClient: expect.any(Object),
            createdTime: expect.any(Object),
            lastUpdate: expect.any(Object),
            latitude: expect.any(Object),
            longitude: expect.any(Object),
            logo: expect.any(Object),
            commercial: expect.any(Object),
            customerSource: expect.any(Object),
            nombreEmployee: expect.any(Object),
            categorie: expect.any(Object),
            caMonnaie: expect.any(Object),
            crmContacts: expect.any(Object),
          })
        );
      });

      it('passing ICustomer should create a new form with FormGroup', () => {
        const formGroup = service.createCustomerFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            customerType: expect.any(Object),
            company: expect.any(Object),
            emailAddress: expect.any(Object),
            businessPhone: expect.any(Object),
            mobilePhone: expect.any(Object),
            faxNumber: expect.any(Object),
            caAnnual: expect.any(Object),
            addresse: expect.any(Object),
            wilaya: expect.any(Object),
            daira: expect.any(Object),
            codePostal: expect.any(Object),
            commune: expect.any(Object),
            webPage: expect.any(Object),
            notes: expect.any(Object),
            attachments: expect.any(Object),
            aboutSource: expect.any(Object),
            dejaClient: expect.any(Object),
            createdTime: expect.any(Object),
            lastUpdate: expect.any(Object),
            latitude: expect.any(Object),
            longitude: expect.any(Object),
            logo: expect.any(Object),
            commercial: expect.any(Object),
            customerSource: expect.any(Object),
            nombreEmployee: expect.any(Object),
            categorie: expect.any(Object),
            caMonnaie: expect.any(Object),
            crmContacts: expect.any(Object),
          })
        );
      });
    });

    describe('getCustomer', () => {
      it('should return NewCustomer for default Customer initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCustomerFormGroup(sampleWithNewData);

        const customer = service.getCustomer(formGroup) as any;

        expect(customer).toMatchObject(sampleWithNewData);
      });

      it('should return NewCustomer for empty Customer initial value', () => {
        const formGroup = service.createCustomerFormGroup();

        const customer = service.getCustomer(formGroup) as any;

        expect(customer).toMatchObject({});
      });

      it('should return ICustomer', () => {
        const formGroup = service.createCustomerFormGroup(sampleWithRequiredData);

        const customer = service.getCustomer(formGroup) as any;

        expect(customer).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICustomer should not enable id FormControl', () => {
        const formGroup = service.createCustomerFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCustomer should disable id FormControl', () => {
        const formGroup = service.createCustomerFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
