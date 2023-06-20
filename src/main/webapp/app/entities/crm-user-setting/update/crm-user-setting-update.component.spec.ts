import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CrmUserSettingFormService } from './crm-user-setting-form.service';
import { CrmUserSettingService } from '../service/crm-user-setting.service';
import { ICrmUserSetting } from '../crm-user-setting.model';

import { CrmUserSettingUpdateComponent } from './crm-user-setting-update.component';

describe('CrmUserSetting Management Update Component', () => {
  let comp: CrmUserSettingUpdateComponent;
  let fixture: ComponentFixture<CrmUserSettingUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let crmUserSettingFormService: CrmUserSettingFormService;
  let crmUserSettingService: CrmUserSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CrmUserSettingUpdateComponent],
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
      .overrideTemplate(CrmUserSettingUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CrmUserSettingUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    crmUserSettingFormService = TestBed.inject(CrmUserSettingFormService);
    crmUserSettingService = TestBed.inject(CrmUserSettingService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const crmUserSetting: ICrmUserSetting = { id: 456 };

      activatedRoute.data = of({ crmUserSetting });
      comp.ngOnInit();

      expect(comp.crmUserSetting).toEqual(crmUserSetting);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmUserSetting>>();
      const crmUserSetting = { id: 123 };
      jest.spyOn(crmUserSettingFormService, 'getCrmUserSetting').mockReturnValue(crmUserSetting);
      jest.spyOn(crmUserSettingService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmUserSetting });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crmUserSetting }));
      saveSubject.complete();

      // THEN
      expect(crmUserSettingFormService.getCrmUserSetting).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(crmUserSettingService.update).toHaveBeenCalledWith(expect.objectContaining(crmUserSetting));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmUserSetting>>();
      const crmUserSetting = { id: 123 };
      jest.spyOn(crmUserSettingFormService, 'getCrmUserSetting').mockReturnValue({ id: null });
      jest.spyOn(crmUserSettingService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmUserSetting: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crmUserSetting }));
      saveSubject.complete();

      // THEN
      expect(crmUserSettingFormService.getCrmUserSetting).toHaveBeenCalled();
      expect(crmUserSettingService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmUserSetting>>();
      const crmUserSetting = { id: 123 };
      jest.spyOn(crmUserSettingService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmUserSetting });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(crmUserSettingService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
