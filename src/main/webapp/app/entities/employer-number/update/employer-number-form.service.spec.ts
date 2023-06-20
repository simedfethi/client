import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../employer-number.test-samples';

import { EmployerNumberFormService } from './employer-number-form.service';

describe('EmployerNumber Form Service', () => {
  let service: EmployerNumberFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployerNumberFormService);
  });

  describe('Service methods', () => {
    describe('createEmployerNumberFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createEmployerNumberFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            emplNumber: expect.any(Object),
          })
        );
      });

      it('passing IEmployerNumber should create a new form with FormGroup', () => {
        const formGroup = service.createEmployerNumberFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            emplNumber: expect.any(Object),
          })
        );
      });
    });

    describe('getEmployerNumber', () => {
      it('should return NewEmployerNumber for default EmployerNumber initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createEmployerNumberFormGroup(sampleWithNewData);

        const employerNumber = service.getEmployerNumber(formGroup) as any;

        expect(employerNumber).toMatchObject(sampleWithNewData);
      });

      it('should return NewEmployerNumber for empty EmployerNumber initial value', () => {
        const formGroup = service.createEmployerNumberFormGroup();

        const employerNumber = service.getEmployerNumber(formGroup) as any;

        expect(employerNumber).toMatchObject({});
      });

      it('should return IEmployerNumber', () => {
        const formGroup = service.createEmployerNumberFormGroup(sampleWithRequiredData);

        const employerNumber = service.getEmployerNumber(formGroup) as any;

        expect(employerNumber).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IEmployerNumber should not enable id FormControl', () => {
        const formGroup = service.createEmployerNumberFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewEmployerNumber should disable id FormControl', () => {
        const formGroup = service.createEmployerNumberFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
