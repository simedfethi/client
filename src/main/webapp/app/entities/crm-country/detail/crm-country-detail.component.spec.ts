import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CrmCountryDetailComponent } from './crm-country-detail.component';

describe('CrmCountry Management Detail Component', () => {
  let comp: CrmCountryDetailComponent;
  let fixture: ComponentFixture<CrmCountryDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrmCountryDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ crmCountry: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CrmCountryDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CrmCountryDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load crmCountry on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.crmCountry).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
