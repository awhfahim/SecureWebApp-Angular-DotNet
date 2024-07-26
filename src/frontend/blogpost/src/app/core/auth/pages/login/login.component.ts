import {Component, inject} from '@angular/core';
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {passwordValidator} from "./password.validator";
import {MessageService} from "../../../../shared/message/message.service";
import {RouterLink} from "@angular/router";
import {AccountService} from "../../services/account.service";
import {LoadingService} from "../../../../shared/loading/loading.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  readonly fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  messageService = inject(MessageService);
  accountService = inject(AccountService);
  loadingService = inject(LoadingService);

   readonly loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), passwordValidator()]]
  });

    get email(){
      return this.loginForm.controls.email;
    }

    get password(){
      return this.loginForm.controls.password;
    }


    async onSubmit(): Promise<void>{
      try{
          if(this.loginForm.invalid){
            this.messageService.showMessage('Enter an Email and Password', 'error');
            return;
          }

          this.loadingService.loadingOn();

          await this.accountService.login({
            email: this.email.value,
            password: this.password.value,
            rememberMe : false
          })
      }
      catch(error){
        this.loadingService.loadingOff();
        this.messageService.showMessage('failed to submit form', 'error');
      }
    }
}
