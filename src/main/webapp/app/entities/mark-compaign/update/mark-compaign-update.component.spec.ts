import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { MarkCompaignFormService } from './mark-compaign-form.service';
import { MarkCompaignService } from '../service/mark-compaign.service';
import { IMarkCompaign } from '../mark-compaign.model';
import { IEmployee } from 'app/entities/employee/employee.model';
import { EmployeeService } from 'app/entities/employee/service/employee.service';
import { IMarkSegment } from 'app/entities/mark-segment/mark-segment.model';
import { MarkSegmentService } from 'app/entities/mark-segment/service/mark-segment.service';

import { MarkCompaignUpdateComponent } from './mark-compaign-update.component';

describe('MarkCompaign Management Update Component', () => {
  let comp: MarkCompaignUpdateComponent;
  let fixture: ComponentFixture<MarkCompaignUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let markCompaignFormService: MarkCompaignFormService;
  let markCompaignService: MarkCompaignService;
  let employeeService: EmployeeService;
  let markSegmentService: MarkSegmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [MarkCompaignUpdateComponent],
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
      .overrideTemplate(MarkCompaignUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MarkCompaignUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    markCompaignFormService = TestBed.inject(MarkCompaignFormService);
    markCompaignService = TestBed.inject(MarkCompaignService);
    employeeService = TestBed.inject(EmployeeService);
    markSegmentService = TestBed.inject(MarkSegmentService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Employee query and add missing value', () => {
      const markCompaign: IMarkCompaign = { id: 456 };
      const sender: IEmployee = { id: 16842 };
      markCompaign.sender = sender;

      const employeeCollection: IEmployee[] = [{ id: 89903 }];
      jest.spyOn(employeeService, 'query').mockReturnValue(of(new HttpResponse({ body: employeeCollection })));
      const additionalEmployees = [sender];
      const expectedCollection: IEmployee[] = [...additionalEmployees, ...employeeCollection];
      jest.spyOn(employeeService, 'addEmployeeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ markCompaign });
      comp.ngOnInit();

      expect(employeeService.query).toHaveBeenCalled();
      expect(employeeService.addEmployeeToCollectionIfMissing).toHaveBeenCalledWith(
        employeeCollection,
        ...additionalEmployees.map(expect.objectContaining)
      );
      expect(comp.employeesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call MarkSegment query and add missing value', () => {
      const markCompaign: IMarkCompaign = { id: 456 };
      const markSegments: IMarkSegment[] = [{ id: 2772 }];
      markCompaign.markSegments = markSegments;

      const markSegmentCollection: IMarkSegment[] = [{ id: 97925 }];
      jest.spyOn(markSegmentService, 'query').mockReturnValue(of(new HttpResponse({ body: markSegmentCollection })));
      const additionalMarkSegments = [...markSegments];
      const expectedCollection: IMarkSegment[] = [...additionalMarkSegments, ...markSegmentCollection];
      jest.spyOn(markSegmentService, 'addMarkSegmentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ markCompaign });
      comp.ngOnInit();

      expect(markSegmentService.query).toHaveBeenCalled();
      expect(markSegmentService.addMarkSegmentToCollectionIfMissing).toHaveBeenCalledWith(
        markSegmentCollection,
        ...additionalMarkSegments.map(expect.objectContaining)
      );
      expect(comp.markSegmentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const markCompaign: IMarkCompaign = { id: 456 };
      const sender: IEmployee = { id: 43538 };
      markCompaign.sender = sender;
      const markSegment: IMarkSegment = { id: 52034 };
      markCompaign.markSegments = [markSegment];

      activatedRoute.data = of({ markCompaign });
      comp.ngOnInit();

      expect(comp.employeesSharedCollection).toContain(sender);
      expect(comp.markSegmentsSharedCollection).toContain(markSegment);
      expect(comp.markCompaign).toEqual(markCompaign);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMarkCompaign>>();
      const markCompaign = { id: 123 };
      jest.spyOn(markCompaignFormService, 'getMarkCompaign').mockReturnValue(markCompaign);
      jest.spyOn(markCompaignService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ markCompaign });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: markCompaign }));
      saveSubject.complete();

      // THEN
      expect(markCompaignFormService.getMarkCompaign).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(markCompaignService.update).toHaveBeenCalledWith(expect.objectContaining(markCompaign));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMarkCompaign>>();
      const markCompaign = { id: 123 };
      jest.spyOn(markCompaignFormService, 'getMarkCompaign').mockReturnValue({ id: null });
      jest.spyOn(markCompaignService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ markCompaign: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: markCompaign }));
      saveSubject.complete();

      // THEN
      expect(markCompaignFormService.getMarkCompaign).toHaveBeenCalled();
      expect(markCompaignService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMarkCompaign>>();
      const markCompaign = { id: 123 };
      jest.spyOn(markCompaignService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ markCompaign });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(markCompaignService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareEmployee', () => {
      it('Should forward to employeeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(employeeService, 'compareEmployee');
        comp.compareEmployee(entity, entity2);
        expect(employeeService.compareEmployee).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareMarkSegment', () => {
      it('Should forward to markSegmentService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(markSegmentService, 'compareMarkSegment');
        comp.compareMarkSegment(entity, entity2);
        expect(markSegmentService.compareMarkSegment).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
