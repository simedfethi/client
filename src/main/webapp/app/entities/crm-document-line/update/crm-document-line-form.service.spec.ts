import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../crm-document-line.test-samples';

import { CrmDocumentLineFormService } from './crm-document-line-form.service';

describe('CrmDocumentLine Form Service', () => {
  let service: CrmDocumentLineFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrmDocumentLineFormService);
  });

  describe('Service methods', () => {
    describe('createCrmDocumentLineFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrmDocumentLineFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            lignePos: expect.any(Object),
            itemRef: expect.any(Object),
            itemDescription: expect.any(Object),
            qte: expect.any(Object),
            qteExpedited: expect.any(Object),
            unitPrice: expect.any(Object),
            reductionPercent: expect.any(Object),
            unitPriceNet: expect.any(Object),
            reductionAmount: expect.any(Object),
            taxPercent: expect.any(Object),
            totalht: expect.any(Object),
            totalttc: expect.any(Object),
            unite: expect.any(Object),
            sourceAprov: expect.any(Object),
            produit: expect.any(Object),
            crmDocument: expect.any(Object),
          })
        );
      });

      it('passing ICrmDocumentLine should create a new form with FormGroup', () => {
        const formGroup = service.createCrmDocumentLineFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            lignePos: expect.any(Object),
            itemRef: expect.any(Object),
            itemDescription: expect.any(Object),
            qte: expect.any(Object),
            qteExpedited: expect.any(Object),
            unitPrice: expect.any(Object),
            reductionPercent: expect.any(Object),
            unitPriceNet: expect.any(Object),
            reductionAmount: expect.any(Object),
            taxPercent: expect.any(Object),
            totalht: expect.any(Object),
            totalttc: expect.any(Object),
            unite: expect.any(Object),
            sourceAprov: expect.any(Object),
            produit: expect.any(Object),
            crmDocument: expect.any(Object),
          })
        );
      });
    });

    describe('getCrmDocumentLine', () => {
      it('should return NewCrmDocumentLine for default CrmDocumentLine initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrmDocumentLineFormGroup(sampleWithNewData);

        const crmDocumentLine = service.getCrmDocumentLine(formGroup) as any;

        expect(crmDocumentLine).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrmDocumentLine for empty CrmDocumentLine initial value', () => {
        const formGroup = service.createCrmDocumentLineFormGroup();

        const crmDocumentLine = service.getCrmDocumentLine(formGroup) as any;

        expect(crmDocumentLine).toMatchObject({});
      });

      it('should return ICrmDocumentLine', () => {
        const formGroup = service.createCrmDocumentLineFormGroup(sampleWithRequiredData);

        const crmDocumentLine = service.getCrmDocumentLine(formGroup) as any;

        expect(crmDocumentLine).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrmDocumentLine should not enable id FormControl', () => {
        const formGroup = service.createCrmDocumentLineFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrmDocumentLine should disable id FormControl', () => {
        const formGroup = service.createCrmDocumentLineFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
