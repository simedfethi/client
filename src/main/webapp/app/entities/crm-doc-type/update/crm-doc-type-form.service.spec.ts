import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../crm-doc-type.test-samples';

import { CrmDocTypeFormService } from './crm-doc-type-form.service';

describe('CrmDocType Form Service', () => {
  let service: CrmDocTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrmDocTypeFormService);
  });

  describe('Service methods', () => {
    describe('createCrmDocTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrmDocTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cdtname: expect.any(Object),
            cdtRef: expect.any(Object),
          })
        );
      });

      it('passing ICrmDocType should create a new form with FormGroup', () => {
        const formGroup = service.createCrmDocTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cdtname: expect.any(Object),
            cdtRef: expect.any(Object),
          })
        );
      });
    });

    describe('getCrmDocType', () => {
      it('should return NewCrmDocType for default CrmDocType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrmDocTypeFormGroup(sampleWithNewData);

        const crmDocType = service.getCrmDocType(formGroup) as any;

        expect(crmDocType).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrmDocType for empty CrmDocType initial value', () => {
        const formGroup = service.createCrmDocTypeFormGroup();

        const crmDocType = service.getCrmDocType(formGroup) as any;

        expect(crmDocType).toMatchObject({});
      });

      it('should return ICrmDocType', () => {
        const formGroup = service.createCrmDocTypeFormGroup(sampleWithRequiredData);

        const crmDocType = service.getCrmDocType(formGroup) as any;

        expect(crmDocType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrmDocType should not enable id FormControl', () => {
        const formGroup = service.createCrmDocTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrmDocType should disable id FormControl', () => {
        const formGroup = service.createCrmDocTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
