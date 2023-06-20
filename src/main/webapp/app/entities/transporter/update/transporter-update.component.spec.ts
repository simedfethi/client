import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TransporterFormService } from './transporter-form.service';
import { TransporterService } from '../service/transporter.service';
import { ITransporter } from '../transporter.model';

import { TransporterUpdateComponent } from './transporter-update.component';

describe('Transporter Management Update Component', () => {
  let comp: TransporterUpdateComponent;
  let fixture: ComponentFixture<TransporterUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let transporterFormService: TransporterFormService;
  let transporterService: TransporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TransporterUpdateComponent],
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
      .overrideTemplate(TransporterUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TransporterUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    transporterFormService = TestBed.inject(TransporterFormService);
    transporterService = TestBed.inject(TransporterService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const transporter: ITransporter = { id: 456 };

      activatedRoute.data = of({ transporter });
      comp.ngOnInit();

      expect(comp.transporter).toEqual(transporter);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITransporter>>();
      const transporter = { id: 123 };
      jest.spyOn(transporterFormService, 'getTransporter').mockReturnValue(transporter);
      jest.spyOn(transporterService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ transporter });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: transporter }));
      saveSubject.complete();

      // THEN
      expect(transporterFormService.getTransporter).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(transporterService.update).toHaveBeenCalledWith(expect.objectContaining(transporter));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITransporter>>();
      const transporter = { id: 123 };
      jest.spyOn(transporterFormService, 'getTransporter').mockReturnValue({ id: null });
      jest.spyOn(transporterService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ transporter: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: transporter }));
      saveSubject.complete();

      // THEN
      expect(transporterFormService.getTransporter).toHaveBeenCalled();
      expect(transporterService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITransporter>>();
      const transporter = { id: 123 };
      jest.spyOn(transporterService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ transporter });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(transporterService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
