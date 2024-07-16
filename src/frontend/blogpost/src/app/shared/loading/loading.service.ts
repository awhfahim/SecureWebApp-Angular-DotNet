import {Injectable, signal, WritableSignal} from '@angular/core';
import {single} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  #loadingSignal : WritableSignal<boolean> = signal<boolean>(false);
  public laoding = this.#loadingSignal.asReadonly();

  loadingOn(){
    this.#loadingSignal.set(true);
  }
  loadingOff(){
    this.#loadingSignal.set(false);
  }
}