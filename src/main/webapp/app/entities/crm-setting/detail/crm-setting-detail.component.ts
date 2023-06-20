import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICrmSetting } from '../crm-setting.model';

@Component({
  selector: 'jhi-crm-setting-detail',
  templateUrl: './crm-setting-detail.component.html',
})
export class CrmSettingDetailComponent implements OnInit {
  crmSetting: ICrmSetting | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crmSetting }) => {
      this.crmSetting = crmSetting;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
