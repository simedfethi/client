import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../crm-role.test-samples';

import { CrmRoleFormService } from './crm-role-form.service';

describe('CrmRole Form Service', () => {
  let service: CrmRoleFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrmRoleFormService);
  });

  describe('Service methods', () => {
    describe('createCrmRoleFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrmRoleFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            roleName: expect.any(Object),
            roleCode: expect.any(Object),
            roleDescription: expect.any(Object),
            crmPermissions: expect.any(Object),
          })
        );
      });

      it('passing ICrmRole should create a new form with FormGroup', () => {
        const formGroup = service.createCrmRoleFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            roleName: expect.any(Object),
            roleCode: expect.any(Object),
            roleDescription: expect.any(Object),
            crmPermissions: expect.any(Object),
          })
        );
      });
    });

    describe('getCrmRole', () => {
      it('should return NewCrmRole for default CrmRole initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrmRoleFormGroup(sampleWithNewData);

        const crmRole = service.getCrmRole(formGroup) as any;

        expect(crmRole).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrmRole for empty CrmRole initial value', () => {
        const formGroup = service.createCrmRoleFormGroup();

        const crmRole = service.getCrmRole(formGroup) as any;

        expect(crmRole).toMatchObject({});
      });

      it('should return ICrmRole', () => {
        const formGroup = service.createCrmRoleFormGroup(sampleWithRequiredData);

        const crmRole = service.getCrmRole(formGroup) as any;

        expect(crmRole).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrmRole should not enable id FormControl', () => {
        const formGroup = service.createCrmRoleFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrmRole should disable id FormControl', () => {
        const formGroup = service.createCrmRoleFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
