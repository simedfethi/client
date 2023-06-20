import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICrmRole } from '../crm-role.model';

@Component({
  selector: 'jhi-crm-role-detail',
  templateUrl: './crm-role-detail.component.html',
})
export class CrmRoleDetailComponent implements OnInit {
  crmRole: ICrmRole | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crmRole }) => {
      this.crmRole = crmRole;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
