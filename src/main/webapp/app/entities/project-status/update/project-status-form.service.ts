import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IProjectStatus, NewProjectStatus } from '../project-status.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IProjectStatus for edit and NewProjectStatusFormGroupInput for create.
 */
type ProjectStatusFormGroupInput = IProjectStatus | PartialWithRequiredKeyOf<NewProjectStatus>;

type ProjectStatusFormDefaults = Pick<NewProjectStatus, 'id'>;

type ProjectStatusFormGroupContent = {
  id: FormControl<IProjectStatus['id'] | NewProjectStatus['id']>;
  stName: FormControl<IProjectStatus['stName']>;
};

export type ProjectStatusFormGroup = FormGroup<ProjectStatusFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ProjectStatusFormService {
  createProjectStatusFormGroup(projectStatus: ProjectStatusFormGroupInput = { id: null }): ProjectStatusFormGroup {
    const projectStatusRawValue = {
      ...this.getFormDefaults(),
      ...projectStatus,
    };
    return new FormGroup<ProjectStatusFormGroupContent>({
      id: new FormControl(
        { value: projectStatusRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      stName: new FormControl(projectStatusRawValue.stName),
    });
  }

  getProjectStatus(form: ProjectStatusFormGroup): IProjectStatus | NewProjectStatus {
    return form.getRawValue() as IProjectStatus | NewProjectStatus;
  }

  resetForm(form: ProjectStatusFormGroup, projectStatus: ProjectStatusFormGroupInput): void {
    const projectStatusRawValue = { ...this.getFormDefaults(), ...projectStatus };
    form.reset(
      {
        ...projectStatusRawValue,
        id: { value: projectStatusRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ProjectStatusFormDefaults {
    return {
      id: null,
    };
  }
}
