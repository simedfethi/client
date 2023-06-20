import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CrmPermissionFormService } from './crm-permission-form.service';
import { CrmPermissionService } from '../service/crm-permission.service';
import { ICrmPermission } from '../crm-permission.model';
import { ICrmRole } from 'app/entities/crm-role/crm-role.model';
import { CrmRoleService } from 'app/entities/crm-role/service/crm-role.service';

import { CrmPermissionUpdateComponent } from './crm-permission-update.component';

describe('CrmPermission Management Update Component', () => {
  let comp: CrmPermissionUpdateComponent;
  let fixture: ComponentFixture<CrmPermissionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let crmPermissionFormService: CrmPermissionFormService;
  let crmPermissionService: CrmPermissionService;
  let crmRoleService: CrmRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CrmPermissionUpdateComponent],
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
      .overrideTemplate(CrmPermissionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CrmPermissionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    crmPermissionFormService = TestBed.inject(CrmPermissionFormService);
    crmPermissionService = TestBed.inject(CrmPermissionService);
    crmRoleService = TestBed.inject(CrmRoleService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call CrmRole query and add missing value', () => {
      const crmPermission: ICrmPermission = { id: 456 };
      const crmRoles: ICrmRole[] = [{ id: 56279 }];
      crmPermission.crmRoles = crmRoles;

      const crmRoleCollection: ICrmRole[] = [{ id: 22255 }];
      jest.spyOn(crmRoleService, 'query').mockReturnValue(of(new HttpResponse({ body: crmRoleCollection })));
      const additionalCrmRoles = [...crmRoles];
      const expectedCollection: ICrmRole[] = [...additionalCrmRoles, ...crmRoleCollection];
      jest.spyOn(crmRoleService, 'addCrmRoleToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ crmPermission });
      comp.ngOnInit();

      expect(crmRoleService.query).toHaveBeenCalled();
      expect(crmRoleService.addCrmRoleToCollectionIfMissing).toHaveBeenCalledWith(
        crmRoleCollection,
        ...additionalCrmRoles.map(expect.objectContaining)
      );
      expect(comp.crmRolesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const crmPermission: ICrmPermission = { id: 456 };
      const crmRole: ICrmRole = { id: 96500 };
      crmPermission.crmRoles = [crmRole];

      activatedRoute.data = of({ crmPermission });
      comp.ngOnInit();

      expect(comp.crmRolesSharedCollection).toContain(crmRole);
      expect(comp.crmPermission).toEqual(crmPermission);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmPermission>>();
      const crmPermission = { id: 123 };
      jest.spyOn(crmPermissionFormService, 'getCrmPermission').mockReturnValue(crmPermission);
      jest.spyOn(crmPermissionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmPermission });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crmPermission }));
      saveSubject.complete();

      // THEN
      expect(crmPermissionFormService.getCrmPermission).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(crmPermissionService.update).toHaveBeenCalledWith(expect.objectContaining(crmPermission));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmPermission>>();
      const crmPermission = { id: 123 };
      jest.spyOn(crmPermissionFormService, 'getCrmPermission').mockReturnValue({ id: null });
      jest.spyOn(crmPermissionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmPermission: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crmPermission }));
      saveSubject.complete();

      // THEN
      expect(crmPermissionFormService.getCrmPermission).toHaveBeenCalled();
      expect(crmPermissionService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmPermission>>();
      const crmPermission = { id: 123 };
      jest.spyOn(crmPermissionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmPermission });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(crmPermissionService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCrmRole', () => {
      it('Should forward to crmRoleService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(crmRoleService, 'compareCrmRole');
        comp.compareCrmRole(entity, entity2);
        expect(crmRoleService.compareCrmRole).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
