import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CrmSettingFormService } from './crm-setting-form.service';
import { CrmSettingService } from '../service/crm-setting.service';
import { ICrmSetting } from '../crm-setting.model';

import { CrmSettingUpdateComponent } from './crm-setting-update.component';

describe('CrmSetting Management Update Component', () => {
  let comp: CrmSettingUpdateComponent;
  let fixture: ComponentFixture<CrmSettingUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let crmSettingFormService: CrmSettingFormService;
  let crmSettingService: CrmSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CrmSettingUpdateComponent],
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
      .overrideTemplate(CrmSettingUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CrmSettingUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    crmSettingFormService = TestBed.inject(CrmSettingFormService);
    crmSettingService = TestBed.inject(CrmSettingService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const crmSetting: ICrmSetting = { id: 456 };

      activatedRoute.data = of({ crmSetting });
      comp.ngOnInit();

      expect(comp.crmSetting).toEqual(crmSetting);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmSetting>>();
      const crmSetting = { id: 123 };
      jest.spyOn(crmSettingFormService, 'getCrmSetting').mockReturnValue(crmSetting);
      jest.spyOn(crmSettingService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmSetting });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crmSetting }));
      saveSubject.complete();

      // THEN
      expect(crmSettingFormService.getCrmSetting).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(crmSettingService.update).toHaveBeenCalledWith(expect.objectContaining(crmSetting));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmSetting>>();
      const crmSetting = { id: 123 };
      jest.spyOn(crmSettingFormService, 'getCrmSetting').mockReturnValue({ id: null });
      jest.spyOn(crmSettingService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmSetting: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crmSetting }));
      saveSubject.complete();

      // THEN
      expect(crmSettingFormService.getCrmSetting).toHaveBeenCalled();
      expect(crmSettingService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmSetting>>();
      const crmSetting = { id: 123 };
      jest.spyOn(crmSettingService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmSetting });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(crmSettingService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
