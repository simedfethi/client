import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MarkSegmentDetailComponent } from './mark-segment-detail.component';

describe('MarkSegment Management Detail Component', () => {
  let comp: MarkSegmentDetailComponent;
  let fixture: ComponentFixture<MarkSegmentDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarkSegmentDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ markSegment: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(MarkSegmentDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(MarkSegmentDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load markSegment on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.markSegment).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
