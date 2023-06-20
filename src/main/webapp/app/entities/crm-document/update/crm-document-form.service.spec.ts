import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../crm-document.test-samples';

import { CrmDocumentFormService } from './crm-document-form.service';

describe('CrmDocument Form Service', () => {
  let service: CrmDocumentFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrmDocumentFormService);
  });

  describe('Service methods', () => {
    describe('createCrmDocumentFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrmDocumentFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            documentname: expect.any(Object),
            docnumber: expect.any(Object),
            docnotes: expect.any(Object),
            cretedDate: expect.any(Object),
            updateDate: expect.any(Object),
            totalPrice: expect.any(Object),
            reductionPercent: expect.any(Object),
            reductionAmount: expect.any(Object),
            shipping: expect.any(Object),
            taxPrice: expect.any(Object),
            netPrice: expect.any(Object),
            transporteur: expect.any(Object),
            transportunit: expect.any(Object),
            crmdoctype: expect.any(Object),
            createdBy: expect.any(Object),
            customer: expect.any(Object),
            crmContact: expect.any(Object),
            transactionCRM: expect.any(Object),
          })
        );
      });

      it('passing ICrmDocument should create a new form with FormGroup', () => {
        const formGroup = service.createCrmDocumentFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            documentname: expect.any(Object),
            docnumber: expect.any(Object),
            docnotes: expect.any(Object),
            cretedDate: expect.any(Object),
            updateDate: expect.any(Object),
            totalPrice: expect.any(Object),
            reductionPercent: expect.any(Object),
            reductionAmount: expect.any(Object),
            shipping: expect.any(Object),
            taxPrice: expect.any(Object),
            netPrice: expect.any(Object),
            transporteur: expect.any(Object),
            transportunit: expect.any(Object),
            crmdoctype: expect.any(Object),
            createdBy: expect.any(Object),
            customer: expect.any(Object),
            crmContact: expect.any(Object),
            transactionCRM: expect.any(Object),
          })
        );
      });
    });

    describe('getCrmDocument', () => {
      it('should return NewCrmDocument for default CrmDocument initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrmDocumentFormGroup(sampleWithNewData);

        const crmDocument = service.getCrmDocument(formGroup) as any;

        expect(crmDocument).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrmDocument for empty CrmDocument initial value', () => {
        const formGroup = service.createCrmDocumentFormGroup();

        const crmDocument = service.getCrmDocument(formGroup) as any;

        expect(crmDocument).toMatchObject({});
      });

      it('should return ICrmDocument', () => {
        const formGroup = service.createCrmDocumentFormGroup(sampleWithRequiredData);

        const crmDocument = service.getCrmDocument(formGroup) as any;

        expect(crmDocument).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrmDocument should not enable id FormControl', () => {
        const formGroup = service.createCrmDocumentFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrmDocument should disable id FormControl', () => {
        const formGroup = service.createCrmDocumentFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
