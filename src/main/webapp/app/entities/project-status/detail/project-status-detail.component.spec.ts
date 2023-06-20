import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProjectStatusDetailComponent } from './project-status-detail.component';

describe('ProjectStatus Management Detail Component', () => {
  let comp: ProjectStatusDetailComponent;
  let fixture: ComponentFixture<ProjectStatusDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectStatusDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ projectStatus: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ProjectStatusDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ProjectStatusDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load projectStatus on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.projectStatus).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
