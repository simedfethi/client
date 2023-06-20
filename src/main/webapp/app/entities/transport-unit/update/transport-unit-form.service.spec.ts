import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../transport-unit.test-samples';

import { TransportUnitFormService } from './transport-unit-form.service';

describe('TransportUnit Form Service', () => {
  let service: TransportUnitFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransportUnitFormService);
  });

  describe('Service methods', () => {
    describe('createTransportUnitFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTransportUnitFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            tunitName: expect.any(Object),
            tunitmatricule: expect.any(Object),
            tunitmatriculeRem: expect.any(Object),
            tunitmarque: expect.any(Object),
            tunitmodel: expect.any(Object),
            tunitcolor: expect.any(Object),
            tcapacity: expect.any(Object),
          })
        );
      });

      it('passing ITransportUnit should create a new form with FormGroup', () => {
        const formGroup = service.createTransportUnitFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            tunitName: expect.any(Object),
            tunitmatricule: expect.any(Object),
            tunitmatriculeRem: expect.any(Object),
            tunitmarque: expect.any(Object),
            tunitmodel: expect.any(Object),
            tunitcolor: expect.any(Object),
            tcapacity: expect.any(Object),
          })
        );
      });
    });

    describe('getTransportUnit', () => {
      it('should return NewTransportUnit for default TransportUnit initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createTransportUnitFormGroup(sampleWithNewData);

        const transportUnit = service.getTransportUnit(formGroup) as any;

        expect(transportUnit).toMatchObject(sampleWithNewData);
      });

      it('should return NewTransportUnit for empty TransportUnit initial value', () => {
        const formGroup = service.createTransportUnitFormGroup();

        const transportUnit = service.getTransportUnit(formGroup) as any;

        expect(transportUnit).toMatchObject({});
      });

      it('should return ITransportUnit', () => {
        const formGroup = service.createTransportUnitFormGroup(sampleWithRequiredData);

        const transportUnit = service.getTransportUnit(formGroup) as any;

        expect(transportUnit).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITransportUnit should not enable id FormControl', () => {
        const formGroup = service.createTransportUnitFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTransportUnit should disable id FormControl', () => {
        const formGroup = service.createTransportUnitFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
