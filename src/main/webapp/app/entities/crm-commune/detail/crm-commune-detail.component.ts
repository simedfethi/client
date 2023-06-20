import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICrmCommune } from '../crm-commune.model';

@Component({
  selector: 'jhi-crm-commune-detail',
  templateUrl: './crm-commune-detail.component.html',
})
export class CrmCommuneDetailComponent implements OnInit {
  crmCommune: ICrmCommune | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crmCommune }) => {
      this.crmCommune = crmCommune;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
