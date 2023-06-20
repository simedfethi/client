import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IActivite, NewActivite } from '../activite.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IActivite for edit and NewActiviteFormGroupInput for create.
 */
type ActiviteFormGroupInput = IActivite | PartialWithRequiredKeyOf<NewActivite>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IActivite | NewActivite> = Omit<T, 'heureActivite' | 'endTime' | 'activiteVuTime'> & {
  heureActivite?: string | null;
  endTime?: string | null;
  activiteVuTime?: string | null;
};

type ActiviteFormRawValue = FormValueOf<IActivite>;

type NewActiviteFormRawValue = FormValueOf<NewActivite>;

type ActiviteFormDefaults = Pick<
  NewActivite,
  'id' | 'heureActivite' | 'activiteVu' | 'activiteAcheve' | 'endTime' | 'activiteVuTime' | 'employeeIncluses'
>;

type ActiviteFormGroupContent = {
  id: FormControl<ActiviteFormRawValue['id'] | NewActivite['id']>;
  typeactivite: FormControl<ActiviteFormRawValue['typeactivite']>;
  resume: FormControl<ActiviteFormRawValue['resume']>;
  dateEcheance: FormControl<ActiviteFormRawValue['dateEcheance']>;
  heureActivite: FormControl<ActiviteFormRawValue['heureActivite']>;
  importance: FormControl<ActiviteFormRawValue['importance']>;
  note: FormControl<ActiviteFormRawValue['note']>;
  activiteVu: FormControl<ActiviteFormRawValue['activiteVu']>;
  activiteAcheve: FormControl<ActiviteFormRawValue['activiteAcheve']>;
  endTime: FormControl<ActiviteFormRawValue['endTime']>;
  activiteVuTime: FormControl<ActiviteFormRawValue['activiteVuTime']>;
  client: FormControl<ActiviteFormRawValue['client']>;
  crmContact: FormControl<ActiviteFormRawValue['crmContact']>;
  transactionCRM: FormControl<ActiviteFormRawValue['transactionCRM']>;
  employee: FormControl<ActiviteFormRawValue['employee']>;
  employeeIncluses: FormControl<ActiviteFormRawValue['employeeIncluses']>;
};

export type ActiviteFormGroup = FormGroup<ActiviteFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ActiviteFormService {
  createActiviteFormGroup(activite: ActiviteFormGroupInput = { id: null }): ActiviteFormGroup {
    const activiteRawValue = this.convertActiviteToActiviteRawValue({
      ...this.getFormDefaults(),
      ...activite,
    });
    return new FormGroup<ActiviteFormGroupContent>({
      id: new FormControl(
        { value: activiteRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      typeactivite: new FormControl(activiteRawValue.typeactivite),
      resume: new FormControl(activiteRawValue.resume),
      dateEcheance: new FormControl(activiteRawValue.dateEcheance),
      heureActivite: new FormControl(activiteRawValue.heureActivite),
      importance: new FormControl(activiteRawValue.importance),
      note: new FormControl(activiteRawValue.note),
      activiteVu: new FormControl(activiteRawValue.activiteVu),
      activiteAcheve: new FormControl(activiteRawValue.activiteAcheve),
      endTime: new FormControl(activiteRawValue.endTime),
      activiteVuTime: new FormControl(activiteRawValue.activiteVuTime),
      client: new FormControl(activiteRawValue.client),
      crmContact: new FormControl(activiteRawValue.crmContact),
      transactionCRM: new FormControl(activiteRawValue.transactionCRM),
      employee: new FormControl(activiteRawValue.employee),
      employeeIncluses: new FormControl(activiteRawValue.employeeIncluses ?? []),
    });
  }

  getActivite(form: ActiviteFormGroup): IActivite | NewActivite {
    return this.convertActiviteRawValueToActivite(form.getRawValue() as ActiviteFormRawValue | NewActiviteFormRawValue);
  }

  resetForm(form: ActiviteFormGroup, activite: ActiviteFormGroupInput): void {
    const activiteRawValue = this.convertActiviteToActiviteRawValue({ ...this.getFormDefaults(), ...activite });
    form.reset(
      {
        ...activiteRawValue,
        id: { value: activiteRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ActiviteFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      heureActivite: currentTime,
      activiteVu: false,
      activiteAcheve: false,
      endTime: currentTime,
      activiteVuTime: currentTime,
      employeeIncluses: [],
    };
  }

  private convertActiviteRawValueToActivite(rawActivite: ActiviteFormRawValue | NewActiviteFormRawValue): IActivite | NewActivite {
    return {
      ...rawActivite,
      heureActivite: dayjs(rawActivite.heureActivite, DATE_TIME_FORMAT),
      endTime: dayjs(rawActivite.endTime, DATE_TIME_FORMAT),
      activiteVuTime: dayjs(rawActivite.activiteVuTime, DATE_TIME_FORMAT),
    };
  }

  private convertActiviteToActiviteRawValue(
    activite: IActivite | (Partial<NewActivite> & ActiviteFormDefaults)
  ): ActiviteFormRawValue | PartialWithRequiredKeyOf<NewActiviteFormRawValue> {
    return {
      ...activite,
      heureActivite: activite.heureActivite ? activite.heureActivite.format(DATE_TIME_FORMAT) : undefined,
      endTime: activite.endTime ? activite.endTime.format(DATE_TIME_FORMAT) : undefined,
      activiteVuTime: activite.activiteVuTime ? activite.activiteVuTime.format(DATE_TIME_FORMAT) : undefined,
      employeeIncluses: activite.employeeIncluses ?? [],
    };
  }
}
