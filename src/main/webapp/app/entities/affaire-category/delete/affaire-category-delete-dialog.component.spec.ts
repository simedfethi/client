jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AffaireCategoryService } from '../service/affaire-category.service';

import { AffaireCategoryDeleteDialogComponent } from './affaire-category-delete-dialog.component';

describe('AffaireCategory Management Delete Component', () => {
  let comp: AffaireCategoryDeleteDialogComponent;
  let fixture: ComponentFixture<AffaireCategoryDeleteDialogComponent>;
  let service: AffaireCategoryService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AffaireCategoryDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(AffaireCategoryDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(AffaireCategoryDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(AffaireCategoryService);
    mockActiveModal = TestBed.inject(NgbActiveModal);
  });

  describe('confirmDelete', () => {
    it('Should call delete service on confirmDelete', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({ body: {} })));

        // WHEN
        comp.confirmDelete(123);
        tick();

        // THEN
        expect(service.delete).toHaveBeenCalledWith(123);
        expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
      })
    ));

    it('Should not call delete service on clear', () => {
      // GIVEN
      jest.spyOn(service, 'delete');

      // WHEN
      comp.cancel();

      // THEN
      expect(service.delete).not.toHaveBeenCalled();
      expect(mockActiveModal.close).not.toHaveBeenCalled();
      expect(mockActiveModal.dismiss).toHaveBeenCalled();
    });
  });
});
