import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { MarkSegmentFormService } from './mark-segment-form.service';
import { MarkSegmentService } from '../service/mark-segment.service';
import { IMarkSegment } from '../mark-segment.model';

import { MarkSegmentUpdateComponent } from './mark-segment-update.component';

describe('MarkSegment Management Update Component', () => {
  let comp: MarkSegmentUpdateComponent;
  let fixture: ComponentFixture<MarkSegmentUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let markSegmentFormService: MarkSegmentFormService;
  let markSegmentService: MarkSegmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [MarkSegmentUpdateComponent],
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
      .overrideTemplate(MarkSegmentUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MarkSegmentUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    markSegmentFormService = TestBed.inject(MarkSegmentFormService);
    markSegmentService = TestBed.inject(MarkSegmentService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const markSegment: IMarkSegment = { id: 456 };

      activatedRoute.data = of({ markSegment });
      comp.ngOnInit();

      expect(comp.markSegment).toEqual(markSegment);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMarkSegment>>();
      const markSegment = { id: 123 };
      jest.spyOn(markSegmentFormService, 'getMarkSegment').mockReturnValue(markSegment);
      jest.spyOn(markSegmentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ markSegment });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: markSegment }));
      saveSubject.complete();

      // THEN
      expect(markSegmentFormService.getMarkSegment).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(markSegmentService.update).toHaveBeenCalledWith(expect.objectContaining(markSegment));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMarkSegment>>();
      const markSegment = { id: 123 };
      jest.spyOn(markSegmentFormService, 'getMarkSegment').mockReturnValue({ id: null });
      jest.spyOn(markSegmentService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ markSegment: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: markSegment }));
      saveSubject.complete();

      // THEN
      expect(markSegmentFormService.getMarkSegment).toHaveBeenCalled();
      expect(markSegmentService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMarkSegment>>();
      const markSegment = { id: 123 };
      jest.spyOn(markSegmentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ markSegment });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(markSegmentService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
