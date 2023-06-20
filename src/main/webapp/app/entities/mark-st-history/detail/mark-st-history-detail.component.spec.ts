import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MarkStHistoryDetailComponent } from './mark-st-history-detail.component';

describe('MarkStHistory Management Detail Component', () => {
  let comp: MarkStHistoryDetailComponent;
  let fixture: ComponentFixture<MarkStHistoryDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarkStHistoryDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ markStHistory: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(MarkStHistoryDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(MarkStHistoryDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load markStHistory on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.markStHistory).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
