import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../transaction-crm.test-samples';

import { TransactionCRMFormService } from './transaction-crm-form.service';

describe('TransactionCRM Form Service', () => {
  let service: TransactionCRMFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionCRMFormService);
  });

  describe('Service methods', () => {
    describe('createTransactionCRMFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTransactionCRMFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reference: expect.any(Object),
            montant: expect.any(Object),
            transactionEtape: expect.any(Object),
            dateFin: expect.any(Object),
            transactionRecurrente: expect.any(Object),
            creeLe: expect.any(Object),
            dernierUpdate: expect.any(Object),
            telephone: expect.any(Object),
            source: expect.any(Object),
            adresse: expect.any(Object),
            notes: expect.any(Object),
            latitude: expect.any(Object),
            longitude: expect.any(Object),
            monnaie: expect.any(Object),
            chargeAffaire: expect.any(Object),
            client: expect.any(Object),
            activites: expect.any(Object),
          })
        );
      });

      it('passing ITransactionCRM should create a new form with FormGroup', () => {
        const formGroup = service.createTransactionCRMFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reference: expect.any(Object),
            montant: expect.any(Object),
            transactionEtape: expect.any(Object),
            dateFin: expect.any(Object),
            transactionRecurrente: expect.any(Object),
            creeLe: expect.any(Object),
            dernierUpdate: expect.any(Object),
            telephone: expect.any(Object),
            source: expect.any(Object),
            adresse: expect.any(Object),
            notes: expect.any(Object),
            latitude: expect.any(Object),
            longitude: expect.any(Object),
            monnaie: expect.any(Object),
            chargeAffaire: expect.any(Object),
            client: expect.any(Object),
            activites: expect.any(Object),
          })
        );
      });
    });

    describe('getTransactionCRM', () => {
      it('should return NewTransactionCRM for default TransactionCRM initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createTransactionCRMFormGroup(sampleWithNewData);

        const transactionCRM = service.getTransactionCRM(formGroup) as any;

        expect(transactionCRM).toMatchObject(sampleWithNewData);
      });

      it('should return NewTransactionCRM for empty TransactionCRM initial value', () => {
        const formGroup = service.createTransactionCRMFormGroup();

        const transactionCRM = service.getTransactionCRM(formGroup) as any;

        expect(transactionCRM).toMatchObject({});
      });

      it('should return ITransactionCRM', () => {
        const formGroup = service.createTransactionCRMFormGroup(sampleWithRequiredData);

        const transactionCRM = service.getTransactionCRM(formGroup) as any;

        expect(transactionCRM).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITransactionCRM should not enable id FormControl', () => {
        const formGroup = service.createTransactionCRMFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTransactionCRM should disable id FormControl', () => {
        const formGroup = service.createTransactionCRMFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
