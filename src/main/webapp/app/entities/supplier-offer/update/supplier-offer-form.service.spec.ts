import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../supplier-offer.test-samples';

import { SupplierOfferFormService } from './supplier-offer-form.service';

describe('SupplierOffer Form Service', () => {
  let service: SupplierOfferFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupplierOfferFormService);
  });

  describe('Service methods', () => {
    describe('createSupplierOfferFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSupplierOfferFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            regularPrice: expect.any(Object),
            discountPrice: expect.any(Object),
            notes: expect.any(Object),
            product: expect.any(Object),
            uniteMesure: expect.any(Object),
            supplier: expect.any(Object),
            transactionCRM: expect.any(Object),
            deliveryTerm: expect.any(Object),
          })
        );
      });

      it('passing ISupplierOffer should create a new form with FormGroup', () => {
        const formGroup = service.createSupplierOfferFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            regularPrice: expect.any(Object),
            discountPrice: expect.any(Object),
            notes: expect.any(Object),
            product: expect.any(Object),
            uniteMesure: expect.any(Object),
            supplier: expect.any(Object),
            transactionCRM: expect.any(Object),
            deliveryTerm: expect.any(Object),
          })
        );
      });
    });

    describe('getSupplierOffer', () => {
      it('should return NewSupplierOffer for default SupplierOffer initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createSupplierOfferFormGroup(sampleWithNewData);

        const supplierOffer = service.getSupplierOffer(formGroup) as any;

        expect(supplierOffer).toMatchObject(sampleWithNewData);
      });

      it('should return NewSupplierOffer for empty SupplierOffer initial value', () => {
        const formGroup = service.createSupplierOfferFormGroup();

        const supplierOffer = service.getSupplierOffer(formGroup) as any;

        expect(supplierOffer).toMatchObject({});
      });

      it('should return ISupplierOffer', () => {
        const formGroup = service.createSupplierOfferFormGroup(sampleWithRequiredData);

        const supplierOffer = service.getSupplierOffer(formGroup) as any;

        expect(supplierOffer).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISupplierOffer should not enable id FormControl', () => {
        const formGroup = service.createSupplierOfferFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSupplierOffer should disable id FormControl', () => {
        const formGroup = service.createSupplierOfferFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
