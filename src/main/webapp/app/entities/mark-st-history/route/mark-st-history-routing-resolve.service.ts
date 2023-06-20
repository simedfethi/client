import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMarkStHistory } from '../mark-st-history.model';
import { MarkStHistoryService } from '../service/mark-st-history.service';

@Injectable({ providedIn: 'root' })
export class MarkStHistoryRoutingResolveService implements Resolve<IMarkStHistory | null> {
  constructor(protected service: MarkStHistoryService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMarkStHistory | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((markStHistory: HttpResponse<IMarkStHistory>) => {
          if (markStHistory.body) {
            return of(markStHistory.body);
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
