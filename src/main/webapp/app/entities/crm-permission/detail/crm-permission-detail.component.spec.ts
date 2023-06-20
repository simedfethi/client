import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CrmPermissionDetailComponent } from './crm-permission-detail.component';

describe('CrmPermission Management Detail Component', () => {
  let comp: CrmPermissionDetailComponent;
  let fixture: ComponentFixture<CrmPermissionDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrmPermissionDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ crmPermission: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CrmPermissionDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CrmPermissionDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load crmPermission on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.crmPermission).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
