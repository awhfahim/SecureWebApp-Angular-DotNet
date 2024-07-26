import {Component, inject} from '@angular/core';
import {
  AbstractControl,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {MessageService} from "../../../../shared/message/message.service";
import {passwordValidator} from "../login/password.validator";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  messageService = inject(MessageService);

  signUpForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), passwordValidator()]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
  }, {validators: [this.samePasswordValidator]})

  get email(){
    return this.signUpForm.controls.email;
  }

  get password(){
    return this.signUpForm.controls.password;
  }

  get confirmPassword(){
    return this.signUpForm.controls.confirmPassword;
  }

  async onSubmit() {
    try{
      if(this.signUpForm.invalid){
        this.messageService.showMessage('Enter all required fields', 'error');
        return;
      }
    }catch (err){
      this.messageService.showMessage('failed to submit form', 'error');
      return;
    }
  }

  private samePasswordValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.valid) {
      return null;
    }

    if (control.get("password")?.value != control.get("confirmPassword")?.value) {
      return { hasIdenticalPassword: true };
    }

    return null;
  }
}
