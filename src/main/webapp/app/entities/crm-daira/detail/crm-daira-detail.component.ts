import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICrmDaira } from '../crm-daira.model';

@Component({
  selector: 'jhi-crm-daira-detail',
  templateUrl: './crm-daira-detail.component.html',
})
export class CrmDairaDetailComponent implements OnInit {
  crmDaira: ICrmDaira | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crmDaira }) => {
      this.crmDaira = crmDaira;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
