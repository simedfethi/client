import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../crm-wilaya.test-samples';

import { CrmWilayaFormService } from './crm-wilaya-form.service';

describe('CrmWilaya Form Service', () => {
  let service: CrmWilayaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrmWilayaFormService);
  });

  describe('Service methods', () => {
    describe('createCrmWilayaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrmWilayaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            wilayaName: expect.any(Object),
            crmCountry: expect.any(Object),
          })
        );
      });

      it('passing ICrmWilaya should create a new form with FormGroup', () => {
        const formGroup = service.createCrmWilayaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            wilayaName: expect.any(Object),
            crmCountry: expect.any(Object),
          })
        );
      });
    });

    describe('getCrmWilaya', () => {
      it('should return NewCrmWilaya for default CrmWilaya initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrmWilayaFormGroup(sampleWithNewData);

        const crmWilaya = service.getCrmWilaya(formGroup) as any;

        expect(crmWilaya).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrmWilaya for empty CrmWilaya initial value', () => {
        const formGroup = service.createCrmWilayaFormGroup();

        const crmWilaya = service.getCrmWilaya(formGroup) as any;

        expect(crmWilaya).toMatchObject({});
      });

      it('should return ICrmWilaya', () => {
        const formGroup = service.createCrmWilayaFormGroup(sampleWithRequiredData);

        const crmWilaya = service.getCrmWilaya(formGroup) as any;

        expect(crmWilaya).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrmWilaya should not enable id FormControl', () => {
        const formGroup = service.createCrmWilayaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrmWilaya should disable id FormControl', () => {
        const formGroup = service.createCrmWilayaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
