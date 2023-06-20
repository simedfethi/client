import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../crm-daira.test-samples';

import { CrmDairaFormService } from './crm-daira-form.service';

describe('CrmDaira Form Service', () => {
  let service: CrmDairaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrmDairaFormService);
  });

  describe('Service methods', () => {
    describe('createCrmDairaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrmDairaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            dairaName: expect.any(Object),
            crmWilaya: expect.any(Object),
          })
        );
      });

      it('passing ICrmDaira should create a new form with FormGroup', () => {
        const formGroup = service.createCrmDairaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            dairaName: expect.any(Object),
            crmWilaya: expect.any(Object),
          })
        );
      });
    });

    describe('getCrmDaira', () => {
      it('should return NewCrmDaira for default CrmDaira initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrmDairaFormGroup(sampleWithNewData);

        const crmDaira = service.getCrmDaira(formGroup) as any;

        expect(crmDaira).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrmDaira for empty CrmDaira initial value', () => {
        const formGroup = service.createCrmDairaFormGroup();

        const crmDaira = service.getCrmDaira(formGroup) as any;

        expect(crmDaira).toMatchObject({});
      });

      it('should return ICrmDaira', () => {
        const formGroup = service.createCrmDairaFormGroup(sampleWithRequiredData);

        const crmDaira = service.getCrmDaira(formGroup) as any;

        expect(crmDaira).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrmDaira should not enable id FormControl', () => {
        const formGroup = service.createCrmDairaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrmDaira should disable id FormControl', () => {
        const formGroup = service.createCrmDairaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
