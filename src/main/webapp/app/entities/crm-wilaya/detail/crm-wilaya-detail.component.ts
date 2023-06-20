import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICrmWilaya } from '../crm-wilaya.model';

@Component({
  selector: 'jhi-crm-wilaya-detail',
  templateUrl: './crm-wilaya-detail.component.html',
})
export class CrmWilayaDetailComponent implements OnInit {
  crmWilaya: ICrmWilaya | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crmWilaya }) => {
      this.crmWilaya = crmWilaya;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
