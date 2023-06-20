import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TransportUnitDetailComponent } from './transport-unit-detail.component';

describe('TransportUnit Management Detail Component', () => {
  let comp: TransportUnitDetailComponent;
  let fixture: ComponentFixture<TransportUnitDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransportUnitDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ transportUnit: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(TransportUnitDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TransportUnitDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load transportUnit on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.transportUnit).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
