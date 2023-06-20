import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../mark-st-history.test-samples';

import { MarkStHistoryFormService } from './mark-st-history-form.service';

describe('MarkStHistory Form Service', () => {
  let service: MarkStHistoryFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkStHistoryFormService);
  });

  describe('Service methods', () => {
    describe('createMarkStHistoryFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createMarkStHistoryFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            startTime: expect.any(Object),
            endTime: expect.any(Object),
            createdby: expect.any(Object),
            transactionCRM: expect.any(Object),
            trEtape: expect.any(Object),
          })
        );
      });

      it('passing IMarkStHistory should create a new form with FormGroup', () => {
        const formGroup = service.createMarkStHistoryFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            startTime: expect.any(Object),
            endTime: expect.any(Object),
            createdby: expect.any(Object),
            transactionCRM: expect.any(Object),
            trEtape: expect.any(Object),
          })
        );
      });
    });

    describe('getMarkStHistory', () => {
      it('should return NewMarkStHistory for default MarkStHistory initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createMarkStHistoryFormGroup(sampleWithNewData);

        const markStHistory = service.getMarkStHistory(formGroup) as any;

        expect(markStHistory).toMatchObject(sampleWithNewData);
      });

      it('should return NewMarkStHistory for empty MarkStHistory initial value', () => {
        const formGroup = service.createMarkStHistoryFormGroup();

        const markStHistory = service.getMarkStHistory(formGroup) as any;

        expect(markStHistory).toMatchObject({});
      });

      it('should return IMarkStHistory', () => {
        const formGroup = service.createMarkStHistoryFormGroup(sampleWithRequiredData);

        const markStHistory = service.getMarkStHistory(formGroup) as any;

        expect(markStHistory).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IMarkStHistory should not enable id FormControl', () => {
        const formGroup = service.createMarkStHistoryFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewMarkStHistory should disable id FormControl', () => {
        const formGroup = service.createMarkStHistoryFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
