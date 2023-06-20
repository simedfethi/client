import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TransporterDetailComponent } from './transporter-detail.component';

describe('Transporter Management Detail Component', () => {
  let comp: TransporterDetailComponent;
  let fixture: ComponentFixture<TransporterDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransporterDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ transporter: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(TransporterDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TransporterDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load transporter on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.transporter).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
