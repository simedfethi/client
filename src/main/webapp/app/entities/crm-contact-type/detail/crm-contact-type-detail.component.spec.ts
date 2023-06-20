import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CrmContactTypeDetailComponent } from './crm-contact-type-detail.component';

describe('CrmContactType Management Detail Component', () => {
  let comp: CrmContactTypeDetailComponent;
  let fixture: ComponentFixture<CrmContactTypeDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrmContactTypeDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ crmContactType: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CrmContactTypeDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CrmContactTypeDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load crmContactType on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.crmContactType).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
