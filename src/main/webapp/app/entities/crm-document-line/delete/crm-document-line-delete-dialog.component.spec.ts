jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { CrmDocumentLineService } from '../service/crm-document-line.service';

import { CrmDocumentLineDeleteDialogComponent } from './crm-document-line-delete-dialog.component';

describe('CrmDocumentLine Management Delete Component', () => {
  let comp: CrmDocumentLineDeleteDialogComponent;
  let fixture: ComponentFixture<CrmDocumentLineDeleteDialogComponent>;
  let service: CrmDocumentLineService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CrmDocumentLineDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(CrmDocumentLineDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CrmDocumentLineDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(CrmDocumentLineService);
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
