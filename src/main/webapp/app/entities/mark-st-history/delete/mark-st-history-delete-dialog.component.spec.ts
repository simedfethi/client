jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { MarkStHistoryService } from '../service/mark-st-history.service';

import { MarkStHistoryDeleteDialogComponent } from './mark-st-history-delete-dialog.component';

describe('MarkStHistory Management Delete Component', () => {
  let comp: MarkStHistoryDeleteDialogComponent;
  let fixture: ComponentFixture<MarkStHistoryDeleteDialogComponent>;
  let service: MarkStHistoryService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [MarkStHistoryDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(MarkStHistoryDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(MarkStHistoryDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(MarkStHistoryService);
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
