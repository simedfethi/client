import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../mark-compaign.test-samples';

import { MarkCompaignFormService } from './mark-compaign-form.service';

describe('MarkCompaign Form Service', () => {
  let service: MarkCompaignFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkCompaignFormService);
  });

  describe('Service methods', () => {
    describe('createMarkCompaignFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createMarkCompaignFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            subject: expect.any(Object),
            compaigntype: expect.any(Object),
            attachement: expect.any(Object),
            linkParam: expect.any(Object),
            priorityM: expect.any(Object),
            currentAction: expect.any(Object),
            receipientTotal: expect.any(Object),
            receipientReceive: expect.any(Object),
            receipientView: expect.any(Object),
            receipientClick: expect.any(Object),
            sendTime: expect.any(Object),
            createdAt: expect.any(Object),
            endAt: expect.any(Object),
            sender: expect.any(Object),
            markSegments: expect.any(Object),
          })
        );
      });

      it('passing IMarkCompaign should create a new form with FormGroup', () => {
        const formGroup = service.createMarkCompaignFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            subject: expect.any(Object),
            compaigntype: expect.any(Object),
            attachement: expect.any(Object),
            linkParam: expect.any(Object),
            priorityM: expect.any(Object),
            currentAction: expect.any(Object),
            receipientTotal: expect.any(Object),
            receipientReceive: expect.any(Object),
            receipientView: expect.any(Object),
            receipientClick: expect.any(Object),
            sendTime: expect.any(Object),
            createdAt: expect.any(Object),
            endAt: expect.any(Object),
            sender: expect.any(Object),
            markSegments: expect.any(Object),
          })
        );
      });
    });

    describe('getMarkCompaign', () => {
      it('should return NewMarkCompaign for default MarkCompaign initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createMarkCompaignFormGroup(sampleWithNewData);

        const markCompaign = service.getMarkCompaign(formGroup) as any;

        expect(markCompaign).toMatchObject(sampleWithNewData);
      });

      it('should return NewMarkCompaign for empty MarkCompaign initial value', () => {
        const formGroup = service.createMarkCompaignFormGroup();

        const markCompaign = service.getMarkCompaign(formGroup) as any;

        expect(markCompaign).toMatchObject({});
      });

      it('should return IMarkCompaign', () => {
        const formGroup = service.createMarkCompaignFormGroup(sampleWithRequiredData);

        const markCompaign = service.getMarkCompaign(formGroup) as any;

        expect(markCompaign).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IMarkCompaign should not enable id FormControl', () => {
        const formGroup = service.createMarkCompaignFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewMarkCompaign should disable id FormControl', () => {
        const formGroup = service.createMarkCompaignFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
