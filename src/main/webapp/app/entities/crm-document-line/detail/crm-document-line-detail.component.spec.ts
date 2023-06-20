import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CrmDocumentLineDetailComponent } from './crm-document-line-detail.component';

describe('CrmDocumentLine Management Detail Component', () => {
  let comp: CrmDocumentLineDetailComponent;
  let fixture: ComponentFixture<CrmDocumentLineDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrmDocumentLineDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ crmDocumentLine: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CrmDocumentLineDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CrmDocumentLineDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load crmDocumentLine on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.crmDocumentLine).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
