import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../delivery-term.test-samples';

import { DeliveryTermFormService } from './delivery-term-form.service';

describe('DeliveryTerm Form Service', () => {
  let service: DeliveryTermFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryTermFormService);
  });

  describe('Service methods', () => {
    describe('createDeliveryTermFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDeliveryTermFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            delTerm: expect.any(Object),
          })
        );
      });

      it('passing IDeliveryTerm should create a new form with FormGroup', () => {
        const formGroup = service.createDeliveryTermFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            delTerm: expect.any(Object),
          })
        );
      });
    });

    describe('getDeliveryTerm', () => {
      it('should return NewDeliveryTerm for default DeliveryTerm initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createDeliveryTermFormGroup(sampleWithNewData);

        const deliveryTerm = service.getDeliveryTerm(formGroup) as any;

        expect(deliveryTerm).toMatchObject(sampleWithNewData);
      });

      it('should return NewDeliveryTerm for empty DeliveryTerm initial value', () => {
        const formGroup = service.createDeliveryTermFormGroup();

        const deliveryTerm = service.getDeliveryTerm(formGroup) as any;

        expect(deliveryTerm).toMatchObject({});
      });

      it('should return IDeliveryTerm', () => {
        const formGroup = service.createDeliveryTermFormGroup(sampleWithRequiredData);

        const deliveryTerm = service.getDeliveryTerm(formGroup) as any;

        expect(deliveryTerm).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDeliveryTerm should not enable id FormControl', () => {
        const formGroup = service.createDeliveryTermFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDeliveryTerm should disable id FormControl', () => {
        const formGroup = service.createDeliveryTermFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
