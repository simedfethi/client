import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICrmUserSetting } from '../crm-user-setting.model';

@Component({
  selector: 'jhi-crm-user-setting-detail',
  templateUrl: './crm-user-setting-detail.component.html',
})
export class CrmUserSettingDetailComponent implements OnInit {
  crmUserSetting: ICrmUserSetting | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crmUserSetting }) => {
      this.crmUserSetting = crmUserSetting;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
