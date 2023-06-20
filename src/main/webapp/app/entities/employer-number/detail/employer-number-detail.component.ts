import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmployerNumber } from '../employer-number.model';

@Component({
  selector: 'jhi-employer-number-detail',
  templateUrl: './employer-number-detail.component.html',
})
export class EmployerNumberDetailComponent implements OnInit {
  employerNumber: IEmployerNumber | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ employerNumber }) => {
      this.employerNumber = employerNumber;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
