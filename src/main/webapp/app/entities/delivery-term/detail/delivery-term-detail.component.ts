import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDeliveryTerm } from '../delivery-term.model';

@Component({
  selector: 'jhi-delivery-term-detail',
  templateUrl: './delivery-term-detail.component.html',
})
export class DeliveryTermDetailComponent implements OnInit {
  deliveryTerm: IDeliveryTerm | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ deliveryTerm }) => {
      this.deliveryTerm = deliveryTerm;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
