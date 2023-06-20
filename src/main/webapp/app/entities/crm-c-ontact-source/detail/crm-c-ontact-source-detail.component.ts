import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICrmCOntactSource } from '../crm-c-ontact-source.model';

@Component({
  selector: 'jhi-crm-c-ontact-source-detail',
  templateUrl: './crm-c-ontact-source-detail.component.html',
})
export class CrmCOntactSourceDetailComponent implements OnInit {
  crmCOntactSource: ICrmCOntactSource | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crmCOntactSource }) => {
      this.crmCOntactSource = crmCOntactSource;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
