import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CrmCOntactSourceDetailComponent } from './crm-c-ontact-source-detail.component';

describe('CrmCOntactSource Management Detail Component', () => {
  let comp: CrmCOntactSourceDetailComponent;
  let fixture: ComponentFixture<CrmCOntactSourceDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrmCOntactSourceDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ crmCOntactSource: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CrmCOntactSourceDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CrmCOntactSourceDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load crmCOntactSource on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.crmCOntactSource).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
