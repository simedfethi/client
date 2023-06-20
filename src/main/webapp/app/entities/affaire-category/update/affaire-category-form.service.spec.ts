import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../affaire-category.test-samples';

import { AffaireCategoryFormService } from './affaire-category-form.service';

describe('AffaireCategory Form Service', () => {
  let service: AffaireCategoryFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AffaireCategoryFormService);
  });

  describe('Service methods', () => {
    describe('createAffaireCategoryFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAffaireCategoryFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            categoryName: expect.any(Object),
          })
        );
      });

      it('passing IAffaireCategory should create a new form with FormGroup', () => {
        const formGroup = service.createAffaireCategoryFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            categoryName: expect.any(Object),
          })
        );
      });
    });

    describe('getAffaireCategory', () => {
      it('should return NewAffaireCategory for default AffaireCategory initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAffaireCategoryFormGroup(sampleWithNewData);

        const affaireCategory = service.getAffaireCategory(formGroup) as any;

        expect(affaireCategory).toMatchObject(sampleWithNewData);
      });

      it('should return NewAffaireCategory for empty AffaireCategory initial value', () => {
        const formGroup = service.createAffaireCategoryFormGroup();

        const affaireCategory = service.getAffaireCategory(formGroup) as any;

        expect(affaireCategory).toMatchObject({});
      });

      it('should return IAffaireCategory', () => {
        const formGroup = service.createAffaireCategoryFormGroup(sampleWithRequiredData);

        const affaireCategory = service.getAffaireCategory(formGroup) as any;

        expect(affaireCategory).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAffaireCategory should not enable id FormControl', () => {
        const formGroup = service.createAffaireCategoryFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAffaireCategory should disable id FormControl', () => {
        const formGroup = service.createAffaireCategoryFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
