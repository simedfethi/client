import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../crm-commune.test-samples';

import { CrmCommuneFormService } from './crm-commune-form.service';

describe('CrmCommune Form Service', () => {
  let service: CrmCommuneFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrmCommuneFormService);
  });

  describe('Service methods', () => {
    describe('createCrmCommuneFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrmCommuneFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            communeName: expect.any(Object),
            crmDaira: expect.any(Object),
          })
        );
      });

      it('passing ICrmCommune should create a new form with FormGroup', () => {
        const formGroup = service.createCrmCommuneFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            communeName: expect.any(Object),
            crmDaira: expect.any(Object),
          })
        );
      });
    });

    describe('getCrmCommune', () => {
      it('should return NewCrmCommune for default CrmCommune initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrmCommuneFormGroup(sampleWithNewData);

        const crmCommune = service.getCrmCommune(formGroup) as any;

        expect(crmCommune).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrmCommune for empty CrmCommune initial value', () => {
        const formGroup = service.createCrmCommuneFormGroup();

        const crmCommune = service.getCrmCommune(formGroup) as any;

        expect(crmCommune).toMatchObject({});
      });

      it('should return ICrmCommune', () => {
        const formGroup = service.createCrmCommuneFormGroup(sampleWithRequiredData);

        const crmCommune = service.getCrmCommune(formGroup) as any;

        expect(crmCommune).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrmCommune should not enable id FormControl', () => {
        const formGroup = service.createCrmCommuneFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrmCommune should disable id FormControl', () => {
        const formGroup = service.createCrmCommuneFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
