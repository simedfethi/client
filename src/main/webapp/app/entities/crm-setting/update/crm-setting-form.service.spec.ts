import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../crm-setting.test-samples';

import { CrmSettingFormService } from './crm-setting-form.service';

describe('CrmSetting Form Service', () => {
  let service: CrmSettingFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrmSettingFormService);
  });

  describe('Service methods', () => {
    describe('createCrmSettingFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrmSettingFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            stName: expect.any(Object),
            stValue: expect.any(Object),
          })
        );
      });

      it('passing ICrmSetting should create a new form with FormGroup', () => {
        const formGroup = service.createCrmSettingFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            stName: expect.any(Object),
            stValue: expect.any(Object),
          })
        );
      });
    });

    describe('getCrmSetting', () => {
      it('should return NewCrmSetting for default CrmSetting initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrmSettingFormGroup(sampleWithNewData);

        const crmSetting = service.getCrmSetting(formGroup) as any;

        expect(crmSetting).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrmSetting for empty CrmSetting initial value', () => {
        const formGroup = service.createCrmSettingFormGroup();

        const crmSetting = service.getCrmSetting(formGroup) as any;

        expect(crmSetting).toMatchObject({});
      });

      it('should return ICrmSetting', () => {
        const formGroup = service.createCrmSettingFormGroup(sampleWithRequiredData);

        const crmSetting = service.getCrmSetting(formGroup) as any;

        expect(crmSetting).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrmSetting should not enable id FormControl', () => {
        const formGroup = service.createCrmSettingFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrmSetting should disable id FormControl', () => {
        const formGroup = service.createCrmSettingFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
