import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../crm-concurrent.test-samples';

import { CrmConcurrentFormService } from './crm-concurrent-form.service';

describe('CrmConcurrent Form Service', () => {
  let service: CrmConcurrentFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrmConcurrentFormService);
  });

  describe('Service methods', () => {
    describe('createCrmConcurrentFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrmConcurrentFormGroup();

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
            createdTime: expect.any(Object),
            lastUpdate: expect.any(Object),
            latitude: expect.any(Object),
            longitude: expect.any(Object),
            logo: expect.any(Object),
          })
        );
      });

      it('passing ICrmConcurrent should create a new form with FormGroup', () => {
        const formGroup = service.createCrmConcurrentFormGroup(sampleWithRequiredData);

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
            createdTime: expect.any(Object),
            lastUpdate: expect.any(Object),
            latitude: expect.any(Object),
            longitude: expect.any(Object),
            logo: expect.any(Object),
          })
        );
      });
    });

    describe('getCrmConcurrent', () => {
      it('should return NewCrmConcurrent for default CrmConcurrent initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrmConcurrentFormGroup(sampleWithNewData);

        const crmConcurrent = service.getCrmConcurrent(formGroup) as any;

        expect(crmConcurrent).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrmConcurrent for empty CrmConcurrent initial value', () => {
        const formGroup = service.createCrmConcurrentFormGroup();

        const crmConcurrent = service.getCrmConcurrent(formGroup) as any;

        expect(crmConcurrent).toMatchObject({});
      });

      it('should return ICrmConcurrent', () => {
        const formGroup = service.createCrmConcurrentFormGroup(sampleWithRequiredData);

        const crmConcurrent = service.getCrmConcurrent(formGroup) as any;

        expect(crmConcurrent).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrmConcurrent should not enable id FormControl', () => {
        const formGroup = service.createCrmConcurrentFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrmConcurrent should disable id FormControl', () => {
        const formGroup = service.createCrmConcurrentFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
