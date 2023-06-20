import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CrmAvancementDetailComponent } from './crm-avancement-detail.component';

describe('CrmAvancement Management Detail Component', () => {
  let comp: CrmAvancementDetailComponent;
  let fixture: ComponentFixture<CrmAvancementDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrmAvancementDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ crmAvancement: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CrmAvancementDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CrmAvancementDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load crmAvancement on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.crmAvancement).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
