import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../crm-country.test-samples';

import { CrmCountryFormService } from './crm-country-form.service';

describe('CrmCountry Form Service', () => {
  let service: CrmCountryFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrmCountryFormService);
  });

  describe('Service methods', () => {
    describe('createCrmCountryFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrmCountryFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            countryName: expect.any(Object),
          })
        );
      });

      it('passing ICrmCountry should create a new form with FormGroup', () => {
        const formGroup = service.createCrmCountryFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            countryName: expect.any(Object),
          })
        );
      });
    });

    describe('getCrmCountry', () => {
      it('should return NewCrmCountry for default CrmCountry initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrmCountryFormGroup(sampleWithNewData);

        const crmCountry = service.getCrmCountry(formGroup) as any;

        expect(crmCountry).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrmCountry for empty CrmCountry initial value', () => {
        const formGroup = service.createCrmCountryFormGroup();

        const crmCountry = service.getCrmCountry(formGroup) as any;

        expect(crmCountry).toMatchObject({});
      });

      it('should return ICrmCountry', () => {
        const formGroup = service.createCrmCountryFormGroup(sampleWithRequiredData);

        const crmCountry = service.getCrmCountry(formGroup) as any;

        expect(crmCountry).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrmCountry should not enable id FormControl', () => {
        const formGroup = service.createCrmCountryFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrmCountry should disable id FormControl', () => {
        const formGroup = service.createCrmCountryFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
