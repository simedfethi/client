import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../activite.test-samples';

import { ActiviteFormService } from './activite-form.service';

describe('Activite Form Service', () => {
  let service: ActiviteFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiviteFormService);
  });

  describe('Service methods', () => {
    describe('createActiviteFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createActiviteFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            typeactivite: expect.any(Object),
            resume: expect.any(Object),
            dateEcheance: expect.any(Object),
            heureActivite: expect.any(Object),
            importance: expect.any(Object),
            note: expect.any(Object),
            activiteVu: expect.any(Object),
            activiteAcheve: expect.any(Object),
            endTime: expect.any(Object),
            activiteVuTime: expect.any(Object),
            client: expect.any(Object),
            crmContact: expect.any(Object),
            transactionCRM: expect.any(Object),
            employee: expect.any(Object),
            employeeIncluses: expect.any(Object),
          })
        );
      });

      it('passing IActivite should create a new form with FormGroup', () => {
        const formGroup = service.createActiviteFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            typeactivite: expect.any(Object),
            resume: expect.any(Object),
            dateEcheance: expect.any(Object),
            heureActivite: expect.any(Object),
            importance: expect.any(Object),
            note: expect.any(Object),
            activiteVu: expect.any(Object),
            activiteAcheve: expect.any(Object),
            endTime: expect.any(Object),
            activiteVuTime: expect.any(Object),
            client: expect.any(Object),
            crmContact: expect.any(Object),
            transactionCRM: expect.any(Object),
            employee: expect.any(Object),
            employeeIncluses: expect.any(Object),
          })
        );
      });
    });

    describe('getActivite', () => {
      it('should return NewActivite for default Activite initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createActiviteFormGroup(sampleWithNewData);

        const activite = service.getActivite(formGroup) as any;

        expect(activite).toMatchObject(sampleWithNewData);
      });

      it('should return NewActivite for empty Activite initial value', () => {
        const formGroup = service.createActiviteFormGroup();

        const activite = service.getActivite(formGroup) as any;

        expect(activite).toMatchObject({});
      });

      it('should return IActivite', () => {
        const formGroup = service.createActiviteFormGroup(sampleWithRequiredData);

        const activite = service.getActivite(formGroup) as any;

        expect(activite).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IActivite should not enable id FormControl', () => {
        const formGroup = service.createActiviteFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewActivite should disable id FormControl', () => {
        const formGroup = service.createActiviteFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
