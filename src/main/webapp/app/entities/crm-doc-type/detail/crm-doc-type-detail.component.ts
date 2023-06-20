import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICrmDocType } from '../crm-doc-type.model';

@Component({
  selector: 'jhi-crm-doc-type-detail',
  templateUrl: './crm-doc-type-detail.component.html',
})
export class CrmDocTypeDetailComponent implements OnInit {
  crmDocType: ICrmDocType | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crmDocType }) => {
      this.crmDocType = crmDocType;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
