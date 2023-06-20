import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../customer-category.test-samples';

import { CustomerCategoryFormService } from './customer-category-form.service';

describe('CustomerCategory Form Service', () => {
  let service: CustomerCategoryFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerCategoryFormService);
  });

  describe('Service methods', () => {
    describe('createCustomerCategoryFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCustomerCategoryFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            catCode: expect.any(Object),
            catName: expect.any(Object),
          })
        );
      });

      it('passing ICustomerCategory should create a new form with FormGroup', () => {
        const formGroup = service.createCustomerCategoryFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            catCode: expect.any(Object),
            catName: expect.any(Object),
          })
        );
      });
    });

    describe('getCustomerCategory', () => {
      it('should return NewCustomerCategory for default CustomerCategory initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCustomerCategoryFormGroup(sampleWithNewData);

        const customerCategory = service.getCustomerCategory(formGroup) as any;

        expect(customerCategory).toMatchObject(sampleWithNewData);
      });

      it('should return NewCustomerCategory for empty CustomerCategory initial value', () => {
        const formGroup = service.createCustomerCategoryFormGroup();

        const customerCategory = service.getCustomerCategory(formGroup) as any;

        expect(customerCategory).toMatchObject({});
      });

      it('should return ICustomerCategory', () => {
        const formGroup = service.createCustomerCategoryFormGroup(sampleWithRequiredData);

        const customerCategory = service.getCustomerCategory(formGroup) as any;

        expect(customerCategory).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICustomerCategory should not enable id FormControl', () => {
        const formGroup = service.createCustomerCategoryFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCustomerCategory should disable id FormControl', () => {
        const formGroup = service.createCustomerCategoryFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
