import {Component, inject} from '@angular/core';
import {MessageService} from "./message.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {
    messageService = inject(MessageService);
    message = this.messageService.message;

  onClose() {
    this.messageService.clear();
  }
}
