import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CrmSettingDetailComponent } from './crm-setting-detail.component';

describe('CrmSetting Management Detail Component', () => {
  let comp: CrmSettingDetailComponent;
  let fixture: ComponentFixture<CrmSettingDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrmSettingDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ crmSetting: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CrmSettingDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CrmSettingDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load crmSetting on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.crmSetting).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
