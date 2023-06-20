import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ProjectStatusFormService } from './project-status-form.service';
import { ProjectStatusService } from '../service/project-status.service';
import { IProjectStatus } from '../project-status.model';

import { ProjectStatusUpdateComponent } from './project-status-update.component';

describe('ProjectStatus Management Update Component', () => {
  let comp: ProjectStatusUpdateComponent;
  let fixture: ComponentFixture<ProjectStatusUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let projectStatusFormService: ProjectStatusFormService;
  let projectStatusService: ProjectStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ProjectStatusUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ProjectStatusUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProjectStatusUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    projectStatusFormService = TestBed.inject(ProjectStatusFormService);
    projectStatusService = TestBed.inject(ProjectStatusService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const projectStatus: IProjectStatus = { id: 456 };

      activatedRoute.data = of({ projectStatus });
      comp.ngOnInit();

      expect(comp.projectStatus).toEqual(projectStatus);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProjectStatus>>();
      const projectStatus = { id: 123 };
      jest.spyOn(projectStatusFormService, 'getProjectStatus').mockReturnValue(projectStatus);
      jest.spyOn(projectStatusService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ projectStatus });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: projectStatus }));
      saveSubject.complete();

      // THEN
      expect(projectStatusFormService.getProjectStatus).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(projectStatusService.update).toHaveBeenCalledWith(expect.objectContaining(projectStatus));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProjectStatus>>();
      const projectStatus = { id: 123 };
      jest.spyOn(projectStatusFormService, 'getProjectStatus').mockReturnValue({ id: null });
      jest.spyOn(projectStatusService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ projectStatus: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: projectStatus }));
      saveSubject.complete();

      // THEN
      expect(projectStatusFormService.getProjectStatus).toHaveBeenCalled();
      expect(projectStatusService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProjectStatus>>();
      const projectStatus = { id: 123 };
      jest.spyOn(projectStatusService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ projectStatus });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(projectStatusService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
