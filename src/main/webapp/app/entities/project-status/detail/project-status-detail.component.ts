import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProjectStatus } from '../project-status.model';

@Component({
  selector: 'jhi-project-status-detail',
  templateUrl: './project-status-detail.component.html',
})
export class ProjectStatusDetailComponent implements OnInit {
  projectStatus: IProjectStatus | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ projectStatus }) => {
      this.projectStatus = projectStatus;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
