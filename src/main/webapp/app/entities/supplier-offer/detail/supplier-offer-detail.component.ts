import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISupplierOffer } from '../supplier-offer.model';

@Component({
  selector: 'jhi-supplier-offer-detail',
  templateUrl: './supplier-offer-detail.component.html',
})
export class SupplierOfferDetailComponent implements OnInit {
  supplierOffer: ISupplierOffer | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ supplierOffer }) => {
      this.supplierOffer = supplierOffer;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
