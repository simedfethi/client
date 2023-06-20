import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CrmCommuneDetailComponent } from './crm-commune-detail.component';

describe('CrmCommune Management Detail Component', () => {
  let comp: CrmCommuneDetailComponent;
  let fixture: ComponentFixture<CrmCommuneDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrmCommuneDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ crmCommune: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CrmCommuneDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CrmCommuneDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load crmCommune on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.crmCommune).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
