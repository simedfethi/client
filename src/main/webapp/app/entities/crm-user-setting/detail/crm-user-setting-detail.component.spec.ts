import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CrmUserSettingDetailComponent } from './crm-user-setting-detail.component';

describe('CrmUserSetting Management Detail Component', () => {
  let comp: CrmUserSettingDetailComponent;
  let fixture: ComponentFixture<CrmUserSettingDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrmUserSettingDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ crmUserSetting: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CrmUserSettingDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CrmUserSettingDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load crmUserSetting on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.crmUserSetting).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
