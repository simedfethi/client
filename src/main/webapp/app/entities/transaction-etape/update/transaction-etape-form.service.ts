import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITransactionEtape, NewTransactionEtape } from '../transaction-etape.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITransactionEtape for edit and NewTransactionEtapeFormGroupInput for create.
 */
type TransactionEtapeFormGroupInput = ITransactionEtape | PartialWithRequiredKeyOf<NewTransactionEtape>;

type TransactionEtapeFormDefaults = Pick<NewTransactionEtape, 'id'>;

type TransactionEtapeFormGroupContent = {
  id: FormControl<ITransactionEtape['id'] | NewTransactionEtape['id']>;
  teName: FormControl<ITransactionEtape['teName']>;
  teDescription: FormControl<ITransactionEtape['teDescription']>;
  tebgColor: FormControl<ITransactionEtape['tebgColor']>;
  teIcon: FormControl<ITransactionEtape['teIcon']>;
};

export type TransactionEtapeFormGroup = FormGroup<TransactionEtapeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TransactionEtapeFormService {
  createTransactionEtapeFormGroup(transactionEtape: TransactionEtapeFormGroupInput = { id: null }): TransactionEtapeFormGroup {
    const transactionEtapeRawValue = {
      ...this.getFormDefaults(),
      ...transactionEtape,
    };
    return new FormGroup<TransactionEtapeFormGroupContent>({
      id: new FormControl(
        { value: transactionEtapeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      teName: new FormControl(transactionEtapeRawValue.teName),
      teDescription: new FormControl(transactionEtapeRawValue.teDescription),
      tebgColor: new FormControl(transactionEtapeRawValue.tebgColor),
      teIcon: new FormControl(transactionEtapeRawValue.teIcon),
    });
  }

  getTransactionEtape(form: TransactionEtapeFormGroup): ITransactionEtape | NewTransactionEtape {
    return form.getRawValue() as ITransactionEtape | NewTransactionEtape;
  }

  resetForm(form: TransactionEtapeFormGroup, transactionEtape: TransactionEtapeFormGroupInput): void {
    const transactionEtapeRawValue = { ...this.getFormDefaults(), ...transactionEtape };
    form.reset(
      {
        ...transactionEtapeRawValue,
        id: { value: transactionEtapeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): TransactionEtapeFormDefaults {
    return {
      id: null,
    };
  }
}
