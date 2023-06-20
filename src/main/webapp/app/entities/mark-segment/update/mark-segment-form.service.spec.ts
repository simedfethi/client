import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../mark-segment.test-samples';

import { MarkSegmentFormService } from './mark-segment-form.service';

describe('MarkSegment Form Service', () => {
  let service: MarkSegmentFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkSegmentFormService);
  });

  describe('Service methods', () => {
    describe('createMarkSegmentFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createMarkSegmentFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            segmentName: expect.any(Object),
            customerFilter: expect.any(Object),
            contactFilter: expect.any(Object),
            destinataires: expect.any(Object),
            createdAt: expect.any(Object),
            markCompaigns: expect.any(Object),
          })
        );
      });

      it('passing IMarkSegment should create a new form with FormGroup', () => {
        const formGroup = service.createMarkSegmentFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            segmentName: expect.any(Object),
            customerFilter: expect.any(Object),
            contactFilter: expect.any(Object),
            destinataires: expect.any(Object),
            createdAt: expect.any(Object),
            markCompaigns: expect.any(Object),
          })
        );
      });
    });

    describe('getMarkSegment', () => {
      it('should return NewMarkSegment for default MarkSegment initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createMarkSegmentFormGroup(sampleWithNewData);

        const markSegment = service.getMarkSegment(formGroup) as any;

        expect(markSegment).toMatchObject(sampleWithNewData);
      });

      it('should return NewMarkSegment for empty MarkSegment initial value', () => {
        const formGroup = service.createMarkSegmentFormGroup();

        const markSegment = service.getMarkSegment(formGroup) as any;

        expect(markSegment).toMatchObject({});
      });

      it('should return IMarkSegment', () => {
        const formGroup = service.createMarkSegmentFormGroup(sampleWithRequiredData);

        const markSegment = service.getMarkSegment(formGroup) as any;

        expect(markSegment).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IMarkSegment should not enable id FormControl', () => {
        const formGroup = service.createMarkSegmentFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewMarkSegment should disable id FormControl', () => {
        const formGroup = service.createMarkSegmentFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
