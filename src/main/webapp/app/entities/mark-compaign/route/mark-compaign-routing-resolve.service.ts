import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMarkCompaign } from '../mark-compaign.model';
import { MarkCompaignService } from '../service/mark-compaign.service';

@Injectable({ providedIn: 'root' })
export class MarkCompaignRoutingResolveService implements Resolve<IMarkCompaign | null> {
  constructor(protected service: MarkCompaignService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMarkCompaign | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((markCompaign: HttpResponse<IMarkCompaign>) => {
          if (markCompaign.body) {
            return of(markCompaign.body);
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
