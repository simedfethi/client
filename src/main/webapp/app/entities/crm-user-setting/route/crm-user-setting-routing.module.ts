import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CrmUserSettingComponent } from '../list/crm-user-setting.component';
import { CrmUserSettingDetailComponent } from '../detail/crm-user-setting-detail.component';
import { CrmUserSettingUpdateComponent } from '../update/crm-user-setting-update.component';
import { CrmUserSettingRoutingResolveService } from './crm-user-setting-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const crmUserSettingRoute: Routes = [
  {
    path: '',
    component: CrmUserSettingComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CrmUserSettingDetailComponent,
    resolve: {
      crmUserSetting: CrmUserSettingRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CrmUserSettingUpdateComponent,
    resolve: {
      crmUserSetting: CrmUserSettingRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CrmUserSettingUpdateComponent,
    resolve: {
      crmUserSetting: CrmUserSettingRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(crmUserSettingRoute)],
  exports: [RouterModule],
})
export class CrmUserSettingRoutingModule {}
