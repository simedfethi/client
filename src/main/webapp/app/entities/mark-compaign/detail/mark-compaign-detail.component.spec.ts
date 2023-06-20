import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MarkCompaignDetailComponent } from './mark-compaign-detail.component';

describe('MarkCompaign Management Detail Component', () => {
  let comp: MarkCompaignDetailComponent;
  let fixture: ComponentFixture<MarkCompaignDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarkCompaignDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ markCompaign: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(MarkCompaignDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(MarkCompaignDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load markCompaign on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.markCompaign).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
