import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EmployeeFormService } from './employee-form.service';
import { EmployeeService } from '../service/employee.service';
import { IEmployee } from '../employee.model';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
import { IDepartement } from 'app/entities/departement/departement.model';
import { DepartementService } from 'app/entities/departement/service/departement.service';
import { ICrmUserSetting } from 'app/entities/crm-user-setting/crm-user-setting.model';
import { CrmUserSettingService } from 'app/entities/crm-user-setting/service/crm-user-setting.service';
import { ICrmPermission } from 'app/entities/crm-permission/crm-permission.model';
import { CrmPermissionService } from 'app/entities/crm-permission/service/crm-permission.service';

import { EmployeeUpdateComponent } from './employee-update.component';

describe('Employee Management Update Component', () => {
  let comp: EmployeeUpdateComponent;
  let fixture: ComponentFixture<EmployeeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let employeeFormService: EmployeeFormService;
  let employeeService: EmployeeService;
  let userService: UserService;
  let departementService: DepartementService;
  let crmUserSettingService: CrmUserSettingService;
  let crmPermissionService: CrmPermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EmployeeUpdateComponent],
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
      .overrideTemplate(EmployeeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EmployeeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    employeeFormService = TestBed.inject(EmployeeFormService);
    employeeService = TestBed.inject(EmployeeService);
    userService = TestBed.inject(UserService);
    departementService = TestBed.inject(DepartementService);
    crmUserSettingService = TestBed.inject(CrmUserSettingService);
    crmPermissionService = TestBed.inject(CrmPermissionService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call User query and add missing value', () => {
      const employee: IEmployee = { id: 456 };
      const utilisateur: IUser = { id: 84478 };
      employee.utilisateur = utilisateur;

      const userCollection: IUser[] = [{ id: 1447 }];
      jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
      const additionalUsers = [utilisateur];
      const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
      jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ employee });
      comp.ngOnInit();

      expect(userService.query).toHaveBeenCalled();
      expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(
        userCollection,
        ...additionalUsers.map(expect.objectContaining)
      );
      expect(comp.usersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Departement query and add missing value', () => {
      const employee: IEmployee = { id: 456 };
      const departement: IDepartement = { id: 59601 };
      employee.departement = departement;

      const departementCollection: IDepartement[] = [{ id: 12020 }];
      jest.spyOn(departementService, 'query').mockReturnValue(of(new HttpResponse({ body: departementCollection })));
      const additionalDepartements = [departement];
      const expectedCollection: IDepartement[] = [...additionalDepartements, ...departementCollection];
      jest.spyOn(departementService, 'addDepartementToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ employee });
      comp.ngOnInit();

      expect(departementService.query).toHaveBeenCalled();
      expect(departementService.addDepartementToCollectionIfMissing).toHaveBeenCalledWith(
        departementCollection,
        ...additionalDepartements.map(expect.objectContaining)
      );
      expect(comp.departementsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call CrmUserSetting query and add missing value', () => {
      const employee: IEmployee = { id: 456 };
      const crmUserSettings: ICrmUserSetting[] = [{ id: 14027 }];
      employee.crmUserSettings = crmUserSettings;

      const crmUserSettingCollection: ICrmUserSetting[] = [{ id: 7163 }];
      jest.spyOn(crmUserSettingService, 'query').mockReturnValue(of(new HttpResponse({ body: crmUserSettingCollection })));
      const additionalCrmUserSettings = [...crmUserSettings];
      const expectedCollection: ICrmUserSetting[] = [...additionalCrmUserSettings, ...crmUserSettingCollection];
      jest.spyOn(crmUserSettingService, 'addCrmUserSettingToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ employee });
      comp.ngOnInit();

      expect(crmUserSettingService.query).toHaveBeenCalled();
      expect(crmUserSettingService.addCrmUserSettingToCollectionIfMissing).toHaveBeenCalledWith(
        crmUserSettingCollection,
        ...additionalCrmUserSettings.map(expect.objectContaining)
      );
      expect(comp.crmUserSettingsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call CrmPermission query and add missing value', () => {
      const employee: IEmployee = { id: 456 };
      const crmPermissions: ICrmPermission[] = [{ id: 61659 }];
      employee.crmPermissions = crmPermissions;

      const crmPermissionCollection: ICrmPermission[] = [{ id: 31604 }];
      jest.spyOn(crmPermissionService, 'query').mockReturnValue(of(new HttpResponse({ body: crmPermissionCollection })));
      const additionalCrmPermissions = [...crmPermissions];
      const expectedCollection: ICrmPermission[] = [...additionalCrmPermissions, ...crmPermissionCollection];
      jest.spyOn(crmPermissionService, 'addCrmPermissionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ employee });
      comp.ngOnInit();

      expect(crmPermissionService.query).toHaveBeenCalled();
      expect(crmPermissionService.addCrmPermissionToCollectionIfMissing).toHaveBeenCalledWith(
        crmPermissionCollection,
        ...additionalCrmPermissions.map(expect.objectContaining)
      );
      expect(comp.crmPermissionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const employee: IEmployee = { id: 456 };
      const utilisateur: IUser = { id: 66698 };
      employee.utilisateur = utilisateur;
      const departement: IDepartement = { id: 43584 };
      employee.departement = departement;
      const crmUserSetting: ICrmUserSetting = { id: 36280 };
      employee.crmUserSettings = [crmUserSetting];
      const crmPermission: ICrmPermission = { id: 39537 };
      employee.crmPermissions = [crmPermission];

      activatedRoute.data = of({ employee });
      comp.ngOnInit();

      expect(comp.usersSharedCollection).toContain(utilisateur);
      expect(comp.departementsSharedCollection).toContain(departement);
      expect(comp.crmUserSettingsSharedCollection).toContain(crmUserSetting);
      expect(comp.crmPermissionsSharedCollection).toContain(crmPermission);
      expect(comp.employee).toEqual(employee);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEmployee>>();
      const employee = { id: 123 };
      jest.spyOn(employeeFormService, 'getEmployee').mockReturnValue(employee);
      jest.spyOn(employeeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ employee });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: employee }));
      saveSubject.complete();

      // THEN
      expect(employeeFormService.getEmployee).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(employeeService.update).toHaveBeenCalledWith(expect.objectContaining(employee));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEmployee>>();
      const employee = { id: 123 };
      jest.spyOn(employeeFormService, 'getEmployee').mockReturnValue({ id: null });
      jest.spyOn(employeeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ employee: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: employee }));
      saveSubject.complete();

      // THEN
      expect(employeeFormService.getEmployee).toHaveBeenCalled();
      expect(employeeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEmployee>>();
      const employee = { id: 123 };
      jest.spyOn(employeeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ employee });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(employeeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareUser', () => {
      it('Should forward to userService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(userService, 'compareUser');
        comp.compareUser(entity, entity2);
        expect(userService.compareUser).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareDepartement', () => {
      it('Should forward to departementService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(departementService, 'compareDepartement');
        comp.compareDepartement(entity, entity2);
        expect(departementService.compareDepartement).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareCrmUserSetting', () => {
      it('Should forward to crmUserSettingService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(crmUserSettingService, 'compareCrmUserSetting');
        comp.compareCrmUserSetting(entity, entity2);
        expect(crmUserSettingService.compareCrmUserSetting).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareCrmPermission', () => {
      it('Should forward to crmPermissionService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(crmPermissionService, 'compareCrmPermission');
        comp.compareCrmPermission(entity, entity2);
        expect(crmPermissionService.compareCrmPermission).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
