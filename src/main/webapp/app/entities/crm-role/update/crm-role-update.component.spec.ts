import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CrmRoleFormService } from './crm-role-form.service';
import { CrmRoleService } from '../service/crm-role.service';
import { ICrmRole } from '../crm-role.model';

import { CrmRoleUpdateComponent } from './crm-role-update.component';

describe('CrmRole Management Update Component', () => {
  let comp: CrmRoleUpdateComponent;
  let fixture: ComponentFixture<CrmRoleUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let crmRoleFormService: CrmRoleFormService;
  let crmRoleService: CrmRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CrmRoleUpdateComponent],
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
      .overrideTemplate(CrmRoleUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CrmRoleUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    crmRoleFormService = TestBed.inject(CrmRoleFormService);
    crmRoleService = TestBed.inject(CrmRoleService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const crmRole: ICrmRole = { id: 456 };

      activatedRoute.data = of({ crmRole });
      comp.ngOnInit();

      expect(comp.crmRole).toEqual(crmRole);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmRole>>();
      const crmRole = { id: 123 };
      jest.spyOn(crmRoleFormService, 'getCrmRole').mockReturnValue(crmRole);
      jest.spyOn(crmRoleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmRole });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crmRole }));
      saveSubject.complete();

      // THEN
      expect(crmRoleFormService.getCrmRole).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(crmRoleService.update).toHaveBeenCalledWith(expect.objectContaining(crmRole));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmRole>>();
      const crmRole = { id: 123 };
      jest.spyOn(crmRoleFormService, 'getCrmRole').mockReturnValue({ id: null });
      jest.spyOn(crmRoleService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmRole: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crmRole }));
      saveSubject.complete();

      // THEN
      expect(crmRoleFormService.getCrmRole).toHaveBeenCalled();
      expect(crmRoleService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmRole>>();
      const crmRole = { id: 123 };
      jest.spyOn(crmRoleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmRole });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(crmRoleService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
