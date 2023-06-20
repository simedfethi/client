import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../crm-contact.test-samples';

import { CrmContactFormService } from './crm-contact-form.service';

describe('CrmContact Form Service', () => {
  let service: CrmContactFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrmContactFormService);
  });

  describe('Service methods', () => {
    describe('createCrmContactFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrmContactFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            lastName: expect.any(Object),
            firstName: expect.any(Object),
            emailAddress: expect.any(Object),
            jobTitle: expect.any(Object),
            contactJob: expect.any(Object),
            businessPhone: expect.any(Object),
            homePhone: expect.any(Object),
            mobilePhone: expect.any(Object),
            faxNumber: expect.any(Object),
            addresse: expect.any(Object),
            naissanceDate: expect.any(Object),
            photo: expect.any(Object),
            wilaya: expect.any(Object),
            daira: expect.any(Object),
            codePostal: expect.any(Object),
            commune: expect.any(Object),
            pays: expect.any(Object),
            webPage: expect.any(Object),
            aboutSource: expect.any(Object),
            notes: expect.any(Object),
            createdTime: expect.any(Object),
            lastUpdate: expect.any(Object),
            contacttype: expect.any(Object),
            crmContactSource: expect.any(Object),
            responsable: expect.any(Object),
            societe: expect.any(Object),
            transactionCRMS: expect.any(Object),
            customers: expect.any(Object),
          })
        );
      });

      it('passing ICrmContact should create a new form with FormGroup', () => {
        const formGroup = service.createCrmContactFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            lastName: expect.any(Object),
            firstName: expect.any(Object),
            emailAddress: expect.any(Object),
            jobTitle: expect.any(Object),
            contactJob: expect.any(Object),
            businessPhone: expect.any(Object),
            homePhone: expect.any(Object),
            mobilePhone: expect.any(Object),
            faxNumber: expect.any(Object),
            addresse: expect.any(Object),
            naissanceDate: expect.any(Object),
            photo: expect.any(Object),
            wilaya: expect.any(Object),
            daira: expect.any(Object),
            codePostal: expect.any(Object),
            commune: expect.any(Object),
            pays: expect.any(Object),
            webPage: expect.any(Object),
            aboutSource: expect.any(Object),
            notes: expect.any(Object),
            createdTime: expect.any(Object),
            lastUpdate: expect.any(Object),
            contacttype: expect.any(Object),
            crmContactSource: expect.any(Object),
            responsable: expect.any(Object),
            societe: expect.any(Object),
            transactionCRMS: expect.any(Object),
            customers: expect.any(Object),
          })
        );
      });
    });

    describe('getCrmContact', () => {
      it('should return NewCrmContact for default CrmContact initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrmContactFormGroup(sampleWithNewData);

        const crmContact = service.getCrmContact(formGroup) as any;

        expect(crmContact).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrmContact for empty CrmContact initial value', () => {
        const formGroup = service.createCrmContactFormGroup();

        const crmContact = service.getCrmContact(formGroup) as any;

        expect(crmContact).toMatchObject({});
      });

      it('should return ICrmContact', () => {
        const formGroup = service.createCrmContactFormGroup(sampleWithRequiredData);

        const crmContact = service.getCrmContact(formGroup) as any;

        expect(crmContact).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrmContact should not enable id FormControl', () => {
        const formGroup = service.createCrmContactFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrmContact should disable id FormControl', () => {
        const formGroup = service.createCrmContactFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
