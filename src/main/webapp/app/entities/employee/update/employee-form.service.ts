import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IEmployee, NewEmployee } from '../employee.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEmployee for edit and NewEmployeeFormGroupInput for create.
 */
type EmployeeFormGroupInput = IEmployee | PartialWithRequiredKeyOf<NewEmployee>;

type EmployeeFormDefaults = Pick<NewEmployee, 'id' | 'crmUserSettings' | 'crmPermissions' | 'activityEmps'>;

type EmployeeFormGroupContent = {
  id: FormControl<IEmployee['id'] | NewEmployee['id']>;
  employeeName: FormControl<IEmployee['employeeName']>;
  gender: FormControl<IEmployee['gender']>;
  phone: FormControl<IEmployee['phone']>;
  addressLine1: FormControl<IEmployee['addressLine1']>;
  emailAdress: FormControl<IEmployee['emailAdress']>;
  utilisateur: FormControl<IEmployee['utilisateur']>;
  departement: FormControl<IEmployee['departement']>;
  crmUserSettings: FormControl<IEmployee['crmUserSettings']>;
  crmPermissions: FormControl<IEmployee['crmPermissions']>;
  activityEmps: FormControl<IEmployee['activityEmps']>;
};

export type EmployeeFormGroup = FormGroup<EmployeeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EmployeeFormService {
  createEmployeeFormGroup(employee: EmployeeFormGroupInput = { id: null }): EmployeeFormGroup {
    const employeeRawValue = {
      ...this.getFormDefaults(),
      ...employee,
    };
    return new FormGroup<EmployeeFormGroupContent>({
      id: new FormControl(
        { value: employeeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      employeeName: new FormControl(employeeRawValue.employeeName),
      gender: new FormControl(employeeRawValue.gender),
      phone: new FormControl(employeeRawValue.phone),
      addressLine1: new FormControl(employeeRawValue.addressLine1),
      emailAdress: new FormControl(employeeRawValue.emailAdress),
      utilisateur: new FormControl(employeeRawValue.utilisateur, {
        validators: [Validators.required],
      }),
      departement: new FormControl(employeeRawValue.departement),
      crmUserSettings: new FormControl(employeeRawValue.crmUserSettings ?? []),
      crmPermissions: new FormControl(employeeRawValue.crmPermissions ?? []),
      activityEmps: new FormControl(employeeRawValue.activityEmps ?? []),
    });
  }

  getEmployee(form: EmployeeFormGroup): IEmployee | NewEmployee {
    return form.getRawValue() as IEmployee | NewEmployee;
  }

  resetForm(form: EmployeeFormGroup, employee: EmployeeFormGroupInput): void {
    const employeeRawValue = { ...this.getFormDefaults(), ...employee };
    form.reset(
      {
        ...employeeRawValue,
        id: { value: employeeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): EmployeeFormDefaults {
    return {
      id: null,
      crmUserSettings: [],
      crmPermissions: [],
      activityEmps: [],
    };
  }
}
