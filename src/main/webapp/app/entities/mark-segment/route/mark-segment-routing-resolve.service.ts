import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMarkSegment } from '../mark-segment.model';
import { MarkSegmentService } from '../service/mark-segment.service';

@Injectable({ providedIn: 'root' })
export class MarkSegmentRoutingResolveService implements Resolve<IMarkSegment | null> {
  constructor(protected service: MarkSegmentService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMarkSegment | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((markSegment: HttpResponse<IMarkSegment>) => {
          if (markSegment.body) {
            return of(markSegment.body);
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
