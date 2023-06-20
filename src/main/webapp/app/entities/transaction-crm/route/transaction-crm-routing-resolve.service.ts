import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITransactionCRM } from '../transaction-crm.model';
import { TransactionCRMService } from '../service/transaction-crm.service';

@Injectable({ providedIn: 'root' })
export class TransactionCRMRoutingResolveService implements Resolve<ITransactionCRM | null> {
  constructor(protected service: TransactionCRMService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITransactionCRM | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((transactionCRM: HttpResponse<ITransactionCRM>) => {
          if (transactionCRM.body) {
            return of(transactionCRM.body);
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
