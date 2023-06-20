import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICrmDocumentLine } from '../crm-document-line.model';

@Component({
  selector: 'jhi-crm-document-line-detail',
  templateUrl: './crm-document-line-detail.component.html',
})
export class CrmDocumentLineDetailComponent implements OnInit {
  crmDocumentLine: ICrmDocumentLine | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crmDocumentLine }) => {
      this.crmDocumentLine = crmDocumentLine;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
