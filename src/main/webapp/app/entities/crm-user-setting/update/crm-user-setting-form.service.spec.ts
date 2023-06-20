import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../crm-user-setting.test-samples';

import { CrmUserSettingFormService } from './crm-user-setting-form.service';

describe('CrmUserSetting Form Service', () => {
  let service: CrmUserSettingFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrmUserSettingFormService);
  });

  describe('Service methods', () => {
    describe('createCrmUserSettingFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrmUserSettingFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            stName: expect.any(Object),
            stValue: expect.any(Object),
            employees: expect.any(Object),
          })
        );
      });

      it('passing ICrmUserSetting should create a new form with FormGroup', () => {
        const formGroup = service.createCrmUserSettingFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            stName: expect.any(Object),
            stValue: expect.any(Object),
            employees: expect.any(Object),
          })
        );
      });
    });

    describe('getCrmUserSetting', () => {
      it('should return NewCrmUserSetting for default CrmUserSetting initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrmUserSettingFormGroup(sampleWithNewData);

        const crmUserSetting = service.getCrmUserSetting(formGroup) as any;

        expect(crmUserSetting).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrmUserSetting for empty CrmUserSetting initial value', () => {
        const formGroup = service.createCrmUserSettingFormGroup();

        const crmUserSetting = service.getCrmUserSetting(formGroup) as any;

        expect(crmUserSetting).toMatchObject({});
      });

      it('should return ICrmUserSetting', () => {
        const formGroup = service.createCrmUserSettingFormGroup(sampleWithRequiredData);

        const crmUserSetting = service.getCrmUserSetting(formGroup) as any;

        expect(crmUserSetting).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrmUserSetting should not enable id FormControl', () => {
        const formGroup = service.createCrmUserSettingFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrmUserSetting should disable id FormControl', () => {
        const formGroup = service.createCrmUserSettingFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
