import {Component, inject} from '@angular/core';
import {MessageService} from "../../shared/message/message.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  messageService = inject(MessageService);

  onClick() {
    this.messageService.showMessage('Testing Message Service', "error");
  }
}
