import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../crm-contact-type.test-samples';

import { CrmContactTypeFormService } from './crm-contact-type-form.service';

describe('CrmContactType Form Service', () => {
  let service: CrmContactTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrmContactTypeFormService);
  });

  describe('Service methods', () => {
    describe('createCrmContactTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrmContactTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            contactType: expect.any(Object),
          })
        );
      });

      it('passing ICrmContactType should create a new form with FormGroup', () => {
        const formGroup = service.createCrmContactTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            contactType: expect.any(Object),
          })
        );
      });
    });

    describe('getCrmContactType', () => {
      it('should return NewCrmContactType for default CrmContactType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrmContactTypeFormGroup(sampleWithNewData);

        const crmContactType = service.getCrmContactType(formGroup) as any;

        expect(crmContactType).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrmContactType for empty CrmContactType initial value', () => {
        const formGroup = service.createCrmContactTypeFormGroup();

        const crmContactType = service.getCrmContactType(formGroup) as any;

        expect(crmContactType).toMatchObject({});
      });

      it('should return ICrmContactType', () => {
        const formGroup = service.createCrmContactTypeFormGroup(sampleWithRequiredData);

        const crmContactType = service.getCrmContactType(formGroup) as any;

        expect(crmContactType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrmContactType should not enable id FormControl', () => {
        const formGroup = service.createCrmContactTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrmContactType should disable id FormControl', () => {
        const formGroup = service.createCrmContactTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
