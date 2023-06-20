import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../transaction-etape.test-samples';

import { TransactionEtapeFormService } from './transaction-etape-form.service';

describe('TransactionEtape Form Service', () => {
  let service: TransactionEtapeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionEtapeFormService);
  });

  describe('Service methods', () => {
    describe('createTransactionEtapeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTransactionEtapeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            teName: expect.any(Object),
            teDescription: expect.any(Object),
            tebgColor: expect.any(Object),
            teIcon: expect.any(Object),
          })
        );
      });

      it('passing ITransactionEtape should create a new form with FormGroup', () => {
        const formGroup = service.createTransactionEtapeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            teName: expect.any(Object),
            teDescription: expect.any(Object),
            tebgColor: expect.any(Object),
            teIcon: expect.any(Object),
          })
        );
      });
    });

    describe('getTransactionEtape', () => {
      it('should return NewTransactionEtape for default TransactionEtape initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createTransactionEtapeFormGroup(sampleWithNewData);

        const transactionEtape = service.getTransactionEtape(formGroup) as any;

        expect(transactionEtape).toMatchObject(sampleWithNewData);
      });

      it('should return NewTransactionEtape for empty TransactionEtape initial value', () => {
        const formGroup = service.createTransactionEtapeFormGroup();

        const transactionEtape = service.getTransactionEtape(formGroup) as any;

        expect(transactionEtape).toMatchObject({});
      });

      it('should return ITransactionEtape', () => {
        const formGroup = service.createTransactionEtapeFormGroup(sampleWithRequiredData);

        const transactionEtape = service.getTransactionEtape(formGroup) as any;

        expect(transactionEtape).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITransactionEtape should not enable id FormControl', () => {
        const formGroup = service.createTransactionEtapeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTransactionEtape should disable id FormControl', () => {
        const formGroup = service.createTransactionEtapeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
