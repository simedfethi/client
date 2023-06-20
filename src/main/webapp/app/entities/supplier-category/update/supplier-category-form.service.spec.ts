import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../supplier-category.test-samples';

import { SupplierCategoryFormService } from './supplier-category-form.service';

describe('SupplierCategory Form Service', () => {
  let service: SupplierCategoryFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupplierCategoryFormService);
  });

  describe('Service methods', () => {
    describe('createSupplierCategoryFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSupplierCategoryFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            spCategory: expect.any(Object),
          })
        );
      });

      it('passing ISupplierCategory should create a new form with FormGroup', () => {
        const formGroup = service.createSupplierCategoryFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            spCategory: expect.any(Object),
          })
        );
      });
    });

    describe('getSupplierCategory', () => {
      it('should return NewSupplierCategory for default SupplierCategory initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createSupplierCategoryFormGroup(sampleWithNewData);

        const supplierCategory = service.getSupplierCategory(formGroup) as any;

        expect(supplierCategory).toMatchObject(sampleWithNewData);
      });

      it('should return NewSupplierCategory for empty SupplierCategory initial value', () => {
        const formGroup = service.createSupplierCategoryFormGroup();

        const supplierCategory = service.getSupplierCategory(formGroup) as any;

        expect(supplierCategory).toMatchObject({});
      });

      it('should return ISupplierCategory', () => {
        const formGroup = service.createSupplierCategoryFormGroup(sampleWithRequiredData);

        const supplierCategory = service.getSupplierCategory(formGroup) as any;

        expect(supplierCategory).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISupplierCategory should not enable id FormControl', () => {
        const formGroup = service.createSupplierCategoryFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSupplierCategory should disable id FormControl', () => {
        const formGroup = service.createSupplierCategoryFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
