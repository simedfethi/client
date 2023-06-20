import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDeliveryTerm } from '../delivery-term.model';
import { DeliveryTermService } from '../service/delivery-term.service';

@Injectable({ providedIn: 'root' })
export class DeliveryTermRoutingResolveService implements Resolve<IDeliveryTerm | null> {
  constructor(protected service: DeliveryTermService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDeliveryTerm | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((deliveryTerm: HttpResponse<IDeliveryTerm>) => {
          if (deliveryTerm.body) {
            return of(deliveryTerm.body);
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
