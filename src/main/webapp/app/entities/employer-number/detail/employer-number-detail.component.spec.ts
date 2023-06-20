import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EmployerNumberDetailComponent } from './employer-number-detail.component';

describe('EmployerNumber Management Detail Component', () => {
  let comp: EmployerNumberDetailComponent;
  let fixture: ComponentFixture<EmployerNumberDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployerNumberDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ employerNumber: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(EmployerNumberDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(EmployerNumberDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load employerNumber on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.employerNumber).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
