import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CrmWilayaDetailComponent } from './crm-wilaya-detail.component';

describe('CrmWilaya Management Detail Component', () => {
  let comp: CrmWilayaDetailComponent;
  let fixture: ComponentFixture<CrmWilayaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrmWilayaDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ crmWilaya: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CrmWilayaDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CrmWilayaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load crmWilaya on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.crmWilaya).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
