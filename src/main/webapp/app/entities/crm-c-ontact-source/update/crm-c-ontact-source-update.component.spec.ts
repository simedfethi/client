import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CrmCOntactSourceFormService } from './crm-c-ontact-source-form.service';
import { CrmCOntactSourceService } from '../service/crm-c-ontact-source.service';
import { ICrmCOntactSource } from '../crm-c-ontact-source.model';

import { CrmCOntactSourceUpdateComponent } from './crm-c-ontact-source-update.component';

describe('CrmCOntactSource Management Update Component', () => {
  let comp: CrmCOntactSourceUpdateComponent;
  let fixture: ComponentFixture<CrmCOntactSourceUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let crmCOntactSourceFormService: CrmCOntactSourceFormService;
  let crmCOntactSourceService: CrmCOntactSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CrmCOntactSourceUpdateComponent],
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
      .overrideTemplate(CrmCOntactSourceUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CrmCOntactSourceUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    crmCOntactSourceFormService = TestBed.inject(CrmCOntactSourceFormService);
    crmCOntactSourceService = TestBed.inject(CrmCOntactSourceService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const crmCOntactSource: ICrmCOntactSource = { id: 456 };

      activatedRoute.data = of({ crmCOntactSource });
      comp.ngOnInit();

      expect(comp.crmCOntactSource).toEqual(crmCOntactSource);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmCOntactSource>>();
      const crmCOntactSource = { id: 123 };
      jest.spyOn(crmCOntactSourceFormService, 'getCrmCOntactSource').mockReturnValue(crmCOntactSource);
      jest.spyOn(crmCOntactSourceService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmCOntactSource });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crmCOntactSource }));
      saveSubject.complete();

      // THEN
      expect(crmCOntactSourceFormService.getCrmCOntactSource).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(crmCOntactSourceService.update).toHaveBeenCalledWith(expect.objectContaining(crmCOntactSource));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmCOntactSource>>();
      const crmCOntactSource = { id: 123 };
      jest.spyOn(crmCOntactSourceFormService, 'getCrmCOntactSource').mockReturnValue({ id: null });
      jest.spyOn(crmCOntactSourceService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmCOntactSource: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crmCOntactSource }));
      saveSubject.complete();

      // THEN
      expect(crmCOntactSourceFormService.getCrmCOntactSource).toHaveBeenCalled();
      expect(crmCOntactSourceService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmCOntactSource>>();
      const crmCOntactSource = { id: 123 };
      jest.spyOn(crmCOntactSourceService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmCOntactSource });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(crmCOntactSourceService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
