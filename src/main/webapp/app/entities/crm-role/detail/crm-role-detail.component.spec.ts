import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CrmRoleDetailComponent } from './crm-role-detail.component';

describe('CrmRole Management Detail Component', () => {
  let comp: CrmRoleDetailComponent;
  let fixture: ComponentFixture<CrmRoleDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrmRoleDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ crmRole: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CrmRoleDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CrmRoleDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load crmRole on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.crmRole).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
