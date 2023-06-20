import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CrmDairaDetailComponent } from './crm-daira-detail.component';

describe('CrmDaira Management Detail Component', () => {
  let comp: CrmDairaDetailComponent;
  let fixture: ComponentFixture<CrmDairaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrmDairaDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ crmDaira: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CrmDairaDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CrmDairaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load crmDaira on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.crmDaira).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
