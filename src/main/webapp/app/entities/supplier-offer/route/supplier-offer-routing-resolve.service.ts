import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISupplierOffer } from '../supplier-offer.model';
import { SupplierOfferService } from '../service/supplier-offer.service';

@Injectable({ providedIn: 'root' })
export class SupplierOfferRoutingResolveService implements Resolve<ISupplierOffer | null> {
  constructor(protected service: SupplierOfferService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISupplierOffer | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((supplierOffer: HttpResponse<ISupplierOffer>) => {
          if (supplierOffer.body) {
            return of(supplierOffer.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
