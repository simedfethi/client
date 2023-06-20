import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FilterListDetailComponent } from './filter-list-detail.component';

describe('FilterList Management Detail Component', () => {
  let comp: FilterListDetailComponent;
  let fixture: ComponentFixture<FilterListDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterListDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ filterList: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(FilterListDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(FilterListDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load filterList on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.filterList).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
