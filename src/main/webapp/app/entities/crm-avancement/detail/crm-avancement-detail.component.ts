import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICrmAvancement } from '../crm-avancement.model';

@Component({
  selector: 'jhi-crm-avancement-detail',
  templateUrl: './crm-avancement-detail.component.html',
})
export class CrmAvancementDetailComponent implements OnInit {
  crmAvancement: ICrmAvancement | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crmAvancement }) => {
      this.crmAvancement = crmAvancement;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
