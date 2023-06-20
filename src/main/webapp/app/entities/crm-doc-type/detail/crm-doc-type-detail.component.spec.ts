import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CrmDocTypeDetailComponent } from './crm-doc-type-detail.component';

describe('CrmDocType Management Detail Component', () => {
  let comp: CrmDocTypeDetailComponent;
  let fixture: ComponentFixture<CrmDocTypeDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrmDocTypeDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ crmDocType: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CrmDocTypeDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CrmDocTypeDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load crmDocType on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.crmDocType).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
