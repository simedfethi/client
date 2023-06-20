import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICrmCountry } from '../crm-country.model';

@Component({
  selector: 'jhi-crm-country-detail',
  templateUrl: './crm-country-detail.component.html',
})
export class CrmCountryDetailComponent implements OnInit {
  crmCountry: ICrmCountry | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crmCountry }) => {
      this.crmCountry = crmCountry;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
