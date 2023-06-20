import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICrmDocument } from '../crm-document.model';
import { CrmDocumentService } from '../service/crm-document.service';

@Injectable({ providedIn: 'root' })
export class CrmDocumentRoutingResolveService implements Resolve<ICrmDocument | null> {
  constructor(protected service: CrmDocumentService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICrmDocument | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((crmDocument: HttpResponse<ICrmDocument>) => {
          if (crmDocument.body) {
            return of(crmDocument.body);
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
