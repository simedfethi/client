import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../crm-permission.test-samples';

import { CrmPermissionFormService } from './crm-permission-form.service';

describe('CrmPermission Form Service', () => {
  let service: CrmPermissionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrmPermissionFormService);
  });

  describe('Service methods', () => {
    describe('createCrmPermissionFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrmPermissionFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            pName: expect.any(Object),
            pDescription: expect.any(Object),
            crmRoles: expect.any(Object),
            employees: expect.any(Object),
          })
        );
      });

      it('passing ICrmPermission should create a new form with FormGroup', () => {
        const formGroup = service.createCrmPermissionFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            pName: expect.any(Object),
            pDescription: expect.any(Object),
            crmRoles: expect.any(Object),
            employees: expect.any(Object),
          })
        );
      });
    });

    describe('getCrmPermission', () => {
      it('should return NewCrmPermission for default CrmPermission initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrmPermissionFormGroup(sampleWithNewData);

        const crmPermission = service.getCrmPermission(formGroup) as any;

        expect(crmPermission).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrmPermission for empty CrmPermission initial value', () => {
        const formGroup = service.createCrmPermissionFormGroup();

        const crmPermission = service.getCrmPermission(formGroup) as any;

        expect(crmPermission).toMatchObject({});
      });

      it('should return ICrmPermission', () => {
        const formGroup = service.createCrmPermissionFormGroup(sampleWithRequiredData);

        const crmPermission = service.getCrmPermission(formGroup) as any;

        expect(crmPermission).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrmPermission should not enable id FormControl', () => {
        const formGroup = service.createCrmPermissionFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrmPermission should disable id FormControl', () => {
        const formGroup = service.createCrmPermissionFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
