import {Component, inject, signal} from '@angular/core';
import {LoadingService} from "./loading.service";

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {
  loadingService = inject(LoadingService);
  loading = this.loadingService.laoding;
}
