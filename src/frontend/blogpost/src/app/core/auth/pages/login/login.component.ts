import {Component, inject, OnInit} from '@angular/core';
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {passwordValidator} from "./password.validator";
import {MessageService} from "../../../../shared/message/message.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  readonly fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  messageService = inject(MessageService);

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


    onSubmit(): void{
      try{
          if(this.loginForm.invalid){
            this.messageService.showMessage('Enter an Email and Password', 'error');
            return;
          }
      }
      catch(error){
        this.messageService.showMessage('failed to submit form', 'error');
      }
    }
}
