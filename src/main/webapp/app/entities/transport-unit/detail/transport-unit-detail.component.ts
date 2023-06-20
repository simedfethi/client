import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITransportUnit } from '../transport-unit.model';

@Component({
  selector: 'jhi-transport-unit-detail',
  templateUrl: './transport-unit-detail.component.html',
})
export class TransportUnitDetailComponent implements OnInit {
  transportUnit: ITransportUnit | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ transportUnit }) => {
      this.transportUnit = transportUnit;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
