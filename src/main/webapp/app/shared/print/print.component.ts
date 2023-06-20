import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'jhi-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent  {
  @Input() content?: string;



  print():void {
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow!.document.write(this.content!);
    printWindow!.document.close();
    printWindow!.focus();
    printWindow!.print();

  }

}
