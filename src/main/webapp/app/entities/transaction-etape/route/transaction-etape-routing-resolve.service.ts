import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITransactionEtape } from '../transaction-etape.model';
import { TransactionEtapeService } from '../service/transaction-etape.service';

@Injectable({ providedIn: 'root' })
export class TransactionEtapeRoutingResolveService implements Resolve<ITransactionEtape | null> {
  constructor(protected service: TransactionEtapeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITransactionEtape | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((transactionEtape: HttpResponse<ITransactionEtape>) => {
          if (transactionEtape.body) {
            return of(transactionEtape.body);
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
