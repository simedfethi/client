import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICrmConcurrent } from '../crm-concurrent.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-crm-concurrent-detail',
  templateUrl: './crm-concurrent-detail.component.html',
})
export class CrmConcurrentDetailComponent implements OnInit {
  crmConcurrent: ICrmConcurrent | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crmConcurrent }) => {
      this.crmConcurrent = crmConcurrent;
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  previousState(): void {
    window.history.back();
  }
}
