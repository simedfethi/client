import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AffaireCategoryFormService, AffaireCategoryFormGroup } from './affaire-category-form.service';
import { IAffaireCategory } from '../affaire-category.model';
import { AffaireCategoryService } from '../service/affaire-category.service';

@Component({
  selector: 'jhi-affaire-category-update',
  templateUrl: './affaire-category-update.component.html',
})
export class AffaireCategoryUpdateComponent implements OnInit {
  isSaving = false;
  affaireCategory: IAffaireCategory | null = null;

  editForm: AffaireCategoryFormGroup = this.affaireCategoryFormService.createAffaireCategoryFormGroup();

  constructor(
    protected affaireCategoryService: AffaireCategoryService,
    protected affaireCategoryFormService: AffaireCategoryFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ affaireCategory }) => {
      this.affaireCategory = affaireCategory;
      if (affaireCategory) {
        this.updateForm(affaireCategory);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const affaireCategory = this.affaireCategoryFormService.getAffaireCategory(this.editForm);
    if (affaireCategory.id !== null) {
      this.subscribeToSaveResponse(this.affaireCategoryService.update(affaireCategory));
    } else {
      this.subscribeToSaveResponse(this.affaireCategoryService.create(affaireCategory));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAffaireCategory>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(affaireCategory: IAffaireCategory): void {
    this.affaireCategory = affaireCategory;
    this.affaireCategoryFormService.resetForm(this.editForm, affaireCategory);
  }
}
