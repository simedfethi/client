import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICrmPermission } from '../crm-permission.model';

@Component({
  selector: 'jhi-crm-permission-detail',
  templateUrl: './crm-permission-detail.component.html',
})
export class CrmPermissionDetailComponent implements OnInit {
  crmPermission: ICrmPermission | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crmPermission }) => {
      this.crmPermission = crmPermission;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
