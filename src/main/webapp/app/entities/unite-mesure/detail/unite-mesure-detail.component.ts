import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUniteMesure } from '../unite-mesure.model';

@Component({
  selector: 'jhi-unite-mesure-detail',
  templateUrl: './unite-mesure-detail.component.html',
})
export class UniteMesureDetailComponent implements OnInit {
  uniteMesure: IUniteMesure | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ uniteMesure }) => {
      this.uniteMesure = uniteMesure;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
