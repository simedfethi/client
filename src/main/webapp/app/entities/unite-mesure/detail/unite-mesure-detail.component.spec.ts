import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UniteMesureDetailComponent } from './unite-mesure-detail.component';

describe('UniteMesure Management Detail Component', () => {
  let comp: UniteMesureDetailComponent;
  let fixture: ComponentFixture<UniteMesureDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UniteMesureDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ uniteMesure: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(UniteMesureDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(UniteMesureDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load uniteMesure on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.uniteMesure).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
