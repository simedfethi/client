import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MessageService {
  messageSource = new Subject<string>();
  message$ = this.messageSource.asObservable();

  sendMessage(message: any): void {
    this.messageSource.next(message);
  }
}
