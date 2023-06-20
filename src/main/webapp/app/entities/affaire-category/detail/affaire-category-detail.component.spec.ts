import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AffaireCategoryDetailComponent } from './affaire-category-detail.component';

describe('AffaireCategory Management Detail Component', () => {
  let comp: AffaireCategoryDetailComponent;
  let fixture: ComponentFixture<AffaireCategoryDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AffaireCategoryDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ affaireCategory: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(AffaireCategoryDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(AffaireCategoryDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load affaireCategory on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.affaireCategory).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
