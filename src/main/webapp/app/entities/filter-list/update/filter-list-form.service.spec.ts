import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../filter-list.test-samples';

import { FilterListFormService } from './filter-list-form.service';

describe('FilterList Form Service', () => {
  let service: FilterListFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterListFormService);
  });

  describe('Service methods', () => {
    describe('createFilterListFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFilterListFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            filterName: expect.any(Object),
            filterString: expect.any(Object),
            entname: expect.any(Object),
          })
        );
      });

      it('passing IFilterList should create a new form with FormGroup', () => {
        const formGroup = service.createFilterListFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            filterName: expect.any(Object),
            filterString: expect.any(Object),
            entname: expect.any(Object),
          })
        );
      });
    });

    describe('getFilterList', () => {
      it('should return NewFilterList for default FilterList initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFilterListFormGroup(sampleWithNewData);

        const filterList = service.getFilterList(formGroup) as any;

        expect(filterList).toMatchObject(sampleWithNewData);
      });

      it('should return NewFilterList for empty FilterList initial value', () => {
        const formGroup = service.createFilterListFormGroup();

        const filterList = service.getFilterList(formGroup) as any;

        expect(filterList).toMatchObject({});
      });

      it('should return IFilterList', () => {
        const formGroup = service.createFilterListFormGroup(sampleWithRequiredData);

        const filterList = service.getFilterList(formGroup) as any;

        expect(filterList).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFilterList should not enable id FormControl', () => {
        const formGroup = service.createFilterListFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFilterList should disable id FormControl', () => {
        const formGroup = service.createFilterListFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
