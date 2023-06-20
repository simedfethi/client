import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ProjectStatusComponent } from './list/project-status.component';
import { ProjectStatusDetailComponent } from './detail/project-status-detail.component';
import { ProjectStatusUpdateComponent } from './update/project-status-update.component';
import { ProjectStatusDeleteDialogComponent } from './delete/project-status-delete-dialog.component';
import { ProjectStatusRoutingModule } from './route/project-status-routing.module';

@NgModule({
  imports: [SharedModule, ProjectStatusRoutingModule],
  declarations: [ProjectStatusComponent, ProjectStatusDetailComponent, ProjectStatusUpdateComponent, ProjectStatusDeleteDialogComponent],
})
export class ProjectStatusModule {}
