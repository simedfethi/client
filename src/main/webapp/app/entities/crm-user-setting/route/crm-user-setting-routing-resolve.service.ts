import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICrmUserSetting } from '../crm-user-setting.model';
import { CrmUserSettingService } from '../service/crm-user-setting.service';

@Injectable({ providedIn: 'root' })
export class CrmUserSettingRoutingResolveService implements Resolve<ICrmUserSetting | null> {
  constructor(protected service: CrmUserSettingService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICrmUserSetting | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((crmUserSetting: HttpResponse<ICrmUserSetting>) => {
          if (crmUserSetting.body) {
            return of(crmUserSetting.body);
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
