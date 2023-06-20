import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CrmCommuneFormService } from './crm-commune-form.service';
import { CrmCommuneService } from '../service/crm-commune.service';
import { ICrmCommune } from '../crm-commune.model';
import { ICrmDaira } from 'app/entities/crm-daira/crm-daira.model';
import { CrmDairaService } from 'app/entities/crm-daira/service/crm-daira.service';

import { CrmCommuneUpdateComponent } from './crm-commune-update.component';

describe('CrmCommune Management Update Component', () => {
  let comp: CrmCommuneUpdateComponent;
  let fixture: ComponentFixture<CrmCommuneUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let crmCommuneFormService: CrmCommuneFormService;
  let crmCommuneService: CrmCommuneService;
  let crmDairaService: CrmDairaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CrmCommuneUpdateComponent],
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
      .overrideTemplate(CrmCommuneUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CrmCommuneUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    crmCommuneFormService = TestBed.inject(CrmCommuneFormService);
    crmCommuneService = TestBed.inject(CrmCommuneService);
    crmDairaService = TestBed.inject(CrmDairaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call CrmDaira query and add missing value', () => {
      const crmCommune: ICrmCommune = { id: 456 };
      const crmDaira: ICrmDaira = { id: 26457 };
      crmCommune.crmDaira = crmDaira;

      const crmDairaCollection: ICrmDaira[] = [{ id: 46258 }];
      jest.spyOn(crmDairaService, 'query').mockReturnValue(of(new HttpResponse({ body: crmDairaCollection })));
      const additionalCrmDairas = [crmDaira];
      const expectedCollection: ICrmDaira[] = [...additionalCrmDairas, ...crmDairaCollection];
      jest.spyOn(crmDairaService, 'addCrmDairaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ crmCommune });
      comp.ngOnInit();

      expect(crmDairaService.query).toHaveBeenCalled();
      expect(crmDairaService.addCrmDairaToCollectionIfMissing).toHaveBeenCalledWith(
        crmDairaCollection,
        ...additionalCrmDairas.map(expect.objectContaining)
      );
      expect(comp.crmDairasSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const crmCommune: ICrmCommune = { id: 456 };
      const crmDaira: ICrmDaira = { id: 78550 };
      crmCommune.crmDaira = crmDaira;

      activatedRoute.data = of({ crmCommune });
      comp.ngOnInit();

      expect(comp.crmDairasSharedCollection).toContain(crmDaira);
      expect(comp.crmCommune).toEqual(crmCommune);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmCommune>>();
      const crmCommune = { id: 123 };
      jest.spyOn(crmCommuneFormService, 'getCrmCommune').mockReturnValue(crmCommune);
      jest.spyOn(crmCommuneService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmCommune });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crmCommune }));
      saveSubject.complete();

      // THEN
      expect(crmCommuneFormService.getCrmCommune).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(crmCommuneService.update).toHaveBeenCalledWith(expect.objectContaining(crmCommune));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmCommune>>();
      const crmCommune = { id: 123 };
      jest.spyOn(crmCommuneFormService, 'getCrmCommune').mockReturnValue({ id: null });
      jest.spyOn(crmCommuneService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmCommune: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crmCommune }));
      saveSubject.complete();

      // THEN
      expect(crmCommuneFormService.getCrmCommune).toHaveBeenCalled();
      expect(crmCommuneService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmCommune>>();
      const crmCommune = { id: 123 };
      jest.spyOn(crmCommuneService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmCommune });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(crmCommuneService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCrmDaira', () => {
      it('Should forward to crmDairaService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(crmDairaService, 'compareCrmDaira');
        comp.compareCrmDaira(entity, entity2);
        expect(crmDairaService.compareCrmDaira).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
