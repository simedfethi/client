import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { FilterListFormService } from './filter-list-form.service';
import { FilterListService } from '../service/filter-list.service';
import { IFilterList } from '../filter-list.model';

import { FilterListUpdateComponent } from './filter-list-update.component';

describe('FilterList Management Update Component', () => {
  let comp: FilterListUpdateComponent;
  let fixture: ComponentFixture<FilterListUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let filterListFormService: FilterListFormService;
  let filterListService: FilterListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FilterListUpdateComponent],
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
      .overrideTemplate(FilterListUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FilterListUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    filterListFormService = TestBed.inject(FilterListFormService);
    filterListService = TestBed.inject(FilterListService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const filterList: IFilterList = { id: 456 };

      activatedRoute.data = of({ filterList });
      comp.ngOnInit();

      expect(comp.filterList).toEqual(filterList);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFilterList>>();
      const filterList = { id: 123 };
      jest.spyOn(filterListFormService, 'getFilterList').mockReturnValue(filterList);
      jest.spyOn(filterListService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ filterList });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: filterList }));
      saveSubject.complete();

      // THEN
      expect(filterListFormService.getFilterList).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(filterListService.update).toHaveBeenCalledWith(expect.objectContaining(filterList));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFilterList>>();
      const filterList = { id: 123 };
      jest.spyOn(filterListFormService, 'getFilterList').mockReturnValue({ id: null });
      jest.spyOn(filterListService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ filterList: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: filterList }));
      saveSubject.complete();

      // THEN
      expect(filterListFormService.getFilterList).toHaveBeenCalled();
      expect(filterListService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFilterList>>();
      const filterList = { id: 123 };
      jest.spyOn(filterListService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ filterList });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(filterListService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
