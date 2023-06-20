import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IActivite } from '../activite.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-activite-detail',
  templateUrl: './activite-detail.component.html',
})
export class ActiviteDetailComponent implements OnInit {
  activite: IActivite | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ activite }) => {
      this.activite = activite;
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
