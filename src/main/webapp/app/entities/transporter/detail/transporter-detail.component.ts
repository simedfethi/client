import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITransporter } from '../transporter.model';

@Component({
  selector: 'jhi-transporter-detail',
  templateUrl: './transporter-detail.component.html',
})
export class TransporterDetailComponent implements OnInit {
  transporter: ITransporter | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ transporter }) => {
      this.transporter = transporter;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
