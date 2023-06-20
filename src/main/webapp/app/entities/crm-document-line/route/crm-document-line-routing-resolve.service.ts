import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICrmDocumentLine } from '../crm-document-line.model';
import { CrmDocumentLineService } from '../service/crm-document-line.service';

@Injectable({ providedIn: 'root' })
export class CrmDocumentLineRoutingResolveService implements Resolve<ICrmDocumentLine | null> {
  constructor(protected service: CrmDocumentLineService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICrmDocumentLine | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((crmDocumentLine: HttpResponse<ICrmDocumentLine>) => {
          if (crmDocumentLine.body) {
            return of(crmDocumentLine.body);
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
