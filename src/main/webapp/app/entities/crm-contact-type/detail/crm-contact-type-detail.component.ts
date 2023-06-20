import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICrmContactType } from '../crm-contact-type.model';

@Component({
  selector: 'jhi-crm-contact-type-detail',
  templateUrl: './crm-contact-type-detail.component.html',
})
export class CrmContactTypeDetailComponent implements OnInit {
  crmContactType: ICrmContactType | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crmContactType }) => {
      this.crmContactType = crmContactType;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
