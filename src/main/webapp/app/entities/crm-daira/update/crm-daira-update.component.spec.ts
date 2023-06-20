import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CrmDairaFormService } from './crm-daira-form.service';
import { CrmDairaService } from '../service/crm-daira.service';
import { ICrmDaira } from '../crm-daira.model';
import { ICrmWilaya } from 'app/entities/crm-wilaya/crm-wilaya.model';
import { CrmWilayaService } from 'app/entities/crm-wilaya/service/crm-wilaya.service';

import { CrmDairaUpdateComponent } from './crm-daira-update.component';

describe('CrmDaira Management Update Component', () => {
  let comp: CrmDairaUpdateComponent;
  let fixture: ComponentFixture<CrmDairaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let crmDairaFormService: CrmDairaFormService;
  let crmDairaService: CrmDairaService;
  let crmWilayaService: CrmWilayaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CrmDairaUpdateComponent],
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
      .overrideTemplate(CrmDairaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CrmDairaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    crmDairaFormService = TestBed.inject(CrmDairaFormService);
    crmDairaService = TestBed.inject(CrmDairaService);
    crmWilayaService = TestBed.inject(CrmWilayaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call CrmWilaya query and add missing value', () => {
      const crmDaira: ICrmDaira = { id: 456 };
      const crmWilaya: ICrmWilaya = { id: 28508 };
      crmDaira.crmWilaya = crmWilaya;

      const crmWilayaCollection: ICrmWilaya[] = [{ id: 20022 }];
      jest.spyOn(crmWilayaService, 'query').mockReturnValue(of(new HttpResponse({ body: crmWilayaCollection })));
      const additionalCrmWilayas = [crmWilaya];
      const expectedCollection: ICrmWilaya[] = [...additionalCrmWilayas, ...crmWilayaCollection];
      jest.spyOn(crmWilayaService, 'addCrmWilayaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ crmDaira });
      comp.ngOnInit();

      expect(crmWilayaService.query).toHaveBeenCalled();
      expect(crmWilayaService.addCrmWilayaToCollectionIfMissing).toHaveBeenCalledWith(
        crmWilayaCollection,
        ...additionalCrmWilayas.map(expect.objectContaining)
      );
      expect(comp.crmWilayasSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const crmDaira: ICrmDaira = { id: 456 };
      const crmWilaya: ICrmWilaya = { id: 82175 };
      crmDaira.crmWilaya = crmWilaya;

      activatedRoute.data = of({ crmDaira });
      comp.ngOnInit();

      expect(comp.crmWilayasSharedCollection).toContain(crmWilaya);
      expect(comp.crmDaira).toEqual(crmDaira);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmDaira>>();
      const crmDaira = { id: 123 };
      jest.spyOn(crmDairaFormService, 'getCrmDaira').mockReturnValue(crmDaira);
      jest.spyOn(crmDairaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmDaira });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crmDaira }));
      saveSubject.complete();

      // THEN
      expect(crmDairaFormService.getCrmDaira).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(crmDairaService.update).toHaveBeenCalledWith(expect.objectContaining(crmDaira));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmDaira>>();
      const crmDaira = { id: 123 };
      jest.spyOn(crmDairaFormService, 'getCrmDaira').mockReturnValue({ id: null });
      jest.spyOn(crmDairaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmDaira: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crmDaira }));
      saveSubject.complete();

      // THEN
      expect(crmDairaFormService.getCrmDaira).toHaveBeenCalled();
      expect(crmDairaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmDaira>>();
      const crmDaira = { id: 123 };
      jest.spyOn(crmDairaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmDaira });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(crmDairaService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCrmWilaya', () => {
      it('Should forward to crmWilayaService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(crmWilayaService, 'compareCrmWilaya');
        comp.compareCrmWilaya(entity, entity2);
        expect(crmWilayaService.compareCrmWilaya).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
