import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AffaireCategoryFormService } from './affaire-category-form.service';
import { AffaireCategoryService } from '../service/affaire-category.service';
import { IAffaireCategory } from '../affaire-category.model';

import { AffaireCategoryUpdateComponent } from './affaire-category-update.component';

describe('AffaireCategory Management Update Component', () => {
  let comp: AffaireCategoryUpdateComponent;
  let fixture: ComponentFixture<AffaireCategoryUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let affaireCategoryFormService: AffaireCategoryFormService;
  let affaireCategoryService: AffaireCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AffaireCategoryUpdateComponent],
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
      .overrideTemplate(AffaireCategoryUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AffaireCategoryUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    affaireCategoryFormService = TestBed.inject(AffaireCategoryFormService);
    affaireCategoryService = TestBed.inject(AffaireCategoryService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const affaireCategory: IAffaireCategory = { id: 456 };

      activatedRoute.data = of({ affaireCategory });
      comp.ngOnInit();

      expect(comp.affaireCategory).toEqual(affaireCategory);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAffaireCategory>>();
      const affaireCategory = { id: 123 };
      jest.spyOn(affaireCategoryFormService, 'getAffaireCategory').mockReturnValue(affaireCategory);
      jest.spyOn(affaireCategoryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ affaireCategory });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: affaireCategory }));
      saveSubject.complete();

      // THEN
      expect(affaireCategoryFormService.getAffaireCategory).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(affaireCategoryService.update).toHaveBeenCalledWith(expect.objectContaining(affaireCategory));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAffaireCategory>>();
      const affaireCategory = { id: 123 };
      jest.spyOn(affaireCategoryFormService, 'getAffaireCategory').mockReturnValue({ id: null });
      jest.spyOn(affaireCategoryService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ affaireCategory: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: affaireCategory }));
      saveSubject.complete();

      // THEN
      expect(affaireCategoryFormService.getAffaireCategory).toHaveBeenCalled();
      expect(affaireCategoryService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAffaireCategory>>();
      const affaireCategory = { id: 123 };
      jest.spyOn(affaireCategoryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ affaireCategory });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(affaireCategoryService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
