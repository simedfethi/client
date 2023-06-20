jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { CrmDocTypeService } from '../service/crm-doc-type.service';

import { CrmDocTypeDeleteDialogComponent } from './crm-doc-type-delete-dialog.component';

describe('CrmDocType Management Delete Component', () => {
  let comp: CrmDocTypeDeleteDialogComponent;
  let fixture: ComponentFixture<CrmDocTypeDeleteDialogComponent>;
  let service: CrmDocTypeService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CrmDocTypeDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(CrmDocTypeDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CrmDocTypeDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(CrmDocTypeService);
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
