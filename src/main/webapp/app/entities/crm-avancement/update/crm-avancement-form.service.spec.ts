import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../crm-avancement.test-samples';

import { CrmAvancementFormService } from './crm-avancement-form.service';

describe('CrmAvancement Form Service', () => {
  let service: CrmAvancementFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrmAvancementFormService);
  });

  describe('Service methods', () => {
    describe('createCrmAvancementFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrmAvancementFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            avanName: expect.any(Object),
          })
        );
      });

      it('passing ICrmAvancement should create a new form with FormGroup', () => {
        const formGroup = service.createCrmAvancementFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            avanName: expect.any(Object),
          })
        );
      });
    });

    describe('getCrmAvancement', () => {
      it('should return NewCrmAvancement for default CrmAvancement initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrmAvancementFormGroup(sampleWithNewData);

        const crmAvancement = service.getCrmAvancement(formGroup) as any;

        expect(crmAvancement).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrmAvancement for empty CrmAvancement initial value', () => {
        const formGroup = service.createCrmAvancementFormGroup();

        const crmAvancement = service.getCrmAvancement(formGroup) as any;

        expect(crmAvancement).toMatchObject({});
      });

      it('should return ICrmAvancement', () => {
        const formGroup = service.createCrmAvancementFormGroup(sampleWithRequiredData);

        const crmAvancement = service.getCrmAvancement(formGroup) as any;

        expect(crmAvancement).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrmAvancement should not enable id FormControl', () => {
        const formGroup = service.createCrmAvancementFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrmAvancement should disable id FormControl', () => {
        const formGroup = service.createCrmAvancementFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
