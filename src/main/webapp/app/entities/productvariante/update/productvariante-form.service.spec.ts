import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../productvariante.test-samples';

import { ProductvarianteFormService } from './productvariante-form.service';

describe('Productvariante Form Service', () => {
  let service: ProductvarianteFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductvarianteFormService);
  });

  describe('Service methods', () => {
    describe('createProductvarianteFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createProductvarianteFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            picture: expect.any(Object),
            codebarre: expect.any(Object),
            productCode: expect.any(Object),
            salePrice: expect.any(Object),
            uniteMesure: expect.any(Object),
            stockDisponible: expect.any(Object),
            products: expect.any(Object),
          })
        );
      });

      it('passing IProductvariante should create a new form with FormGroup', () => {
        const formGroup = service.createProductvarianteFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            picture: expect.any(Object),
            codebarre: expect.any(Object),
            productCode: expect.any(Object),
            salePrice: expect.any(Object),
            uniteMesure: expect.any(Object),
            stockDisponible: expect.any(Object),
            products: expect.any(Object),
          })
        );
      });
    });

    describe('getProductvariante', () => {
      it('should return NewProductvariante for default Productvariante initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createProductvarianteFormGroup(sampleWithNewData);

        const productvariante = service.getProductvariante(formGroup) as any;

        expect(productvariante).toMatchObject(sampleWithNewData);
      });

      it('should return NewProductvariante for empty Productvariante initial value', () => {
        const formGroup = service.createProductvarianteFormGroup();

        const productvariante = service.getProductvariante(formGroup) as any;

        expect(productvariante).toMatchObject({});
      });

      it('should return IProductvariante', () => {
        const formGroup = service.createProductvarianteFormGroup(sampleWithRequiredData);

        const productvariante = service.getProductvariante(formGroup) as any;

        expect(productvariante).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IProductvariante should not enable id FormControl', () => {
        const formGroup = service.createProductvarianteFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewProductvariante should disable id FormControl', () => {
        const formGroup = service.createProductvarianteFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
