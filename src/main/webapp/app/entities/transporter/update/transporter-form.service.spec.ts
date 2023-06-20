import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../transporter.test-samples';

import { TransporterFormService } from './transporter-form.service';

describe('Transporter Form Service', () => {
  let service: TransporterFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransporterFormService);
  });

  describe('Service methods', () => {
    describe('createTransporterFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTransporterFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nomprenom: expect.any(Object),
            telephone: expect.any(Object),
            permitdoc: expect.any(Object),
            expireDate: expect.any(Object),
            adresse: expect.any(Object),
            commune: expect.any(Object),
            daira: expect.any(Object),
            wilaya: expect.any(Object),
          })
        );
      });

      it('passing ITransporter should create a new form with FormGroup', () => {
        const formGroup = service.createTransporterFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nomprenom: expect.any(Object),
            telephone: expect.any(Object),
            permitdoc: expect.any(Object),
            expireDate: expect.any(Object),
            adresse: expect.any(Object),
            commune: expect.any(Object),
            daira: expect.any(Object),
            wilaya: expect.any(Object),
          })
        );
      });
    });

    describe('getTransporter', () => {
      it('should return NewTransporter for default Transporter initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createTransporterFormGroup(sampleWithNewData);

        const transporter = service.getTransporter(formGroup) as any;

        expect(transporter).toMatchObject(sampleWithNewData);
      });

      it('should return NewTransporter for empty Transporter initial value', () => {
        const formGroup = service.createTransporterFormGroup();

        const transporter = service.getTransporter(formGroup) as any;

        expect(transporter).toMatchObject({});
      });

      it('should return ITransporter', () => {
        const formGroup = service.createTransporterFormGroup(sampleWithRequiredData);

        const transporter = service.getTransporter(formGroup) as any;

        expect(transporter).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITransporter should not enable id FormControl', () => {
        const formGroup = service.createTransporterFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTransporter should disable id FormControl', () => {
        const formGroup = service.createTransporterFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
