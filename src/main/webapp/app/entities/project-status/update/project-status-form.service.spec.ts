import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../project-status.test-samples';

import { ProjectStatusFormService } from './project-status-form.service';

describe('ProjectStatus Form Service', () => {
  let service: ProjectStatusFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectStatusFormService);
  });

  describe('Service methods', () => {
    describe('createProjectStatusFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createProjectStatusFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            stName: expect.any(Object),
          })
        );
      });

      it('passing IProjectStatus should create a new form with FormGroup', () => {
        const formGroup = service.createProjectStatusFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            stName: expect.any(Object),
          })
        );
      });
    });

    describe('getProjectStatus', () => {
      it('should return NewProjectStatus for default ProjectStatus initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createProjectStatusFormGroup(sampleWithNewData);

        const projectStatus = service.getProjectStatus(formGroup) as any;

        expect(projectStatus).toMatchObject(sampleWithNewData);
      });

      it('should return NewProjectStatus for empty ProjectStatus initial value', () => {
        const formGroup = service.createProjectStatusFormGroup();

        const projectStatus = service.getProjectStatus(formGroup) as any;

        expect(projectStatus).toMatchObject({});
      });

      it('should return IProjectStatus', () => {
        const formGroup = service.createProjectStatusFormGroup(sampleWithRequiredData);

        const projectStatus = service.getProjectStatus(formGroup) as any;

        expect(projectStatus).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IProjectStatus should not enable id FormControl', () => {
        const formGroup = service.createProjectStatusFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewProjectStatus should disable id FormControl', () => {
        const formGroup = service.createProjectStatusFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
