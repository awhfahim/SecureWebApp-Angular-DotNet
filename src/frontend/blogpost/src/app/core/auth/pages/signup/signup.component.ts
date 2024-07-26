import {Component, inject, OnDestroy} from '@angular/core';
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
import { ReCaptchaV3Service, RecaptchaV3Module } from "ng-recaptcha-2"
import { LoadingService } from '../../../../shared/loading/loading.service';
import { finalize, Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { signupModel } from '../../models/signup.model';
import { HttpResponseModel } from '../../models/http-response.model';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule, 
    RecaptchaV3Module,
    RouterLink
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnDestroy{

  fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  messageService = inject(MessageService);
  private recaptchaV3Service = inject(ReCaptchaV3Service);
  private loadingService = inject(LoadingService);
  private recaptchaSubcription : Subscription | undefined;
  private accountService = inject(AccountService);

  disableSubmit: boolean = false;

  signUpForm = this.fb.group({
    fullname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), passwordValidator()]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
  }, {validators: [this.samePasswordValidator]})

  get fullname(){
    return this.signUpForm.controls.fullname;
  }

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
      
      this.disableSubmit = true;
      this.loadingService.loadingOn();
      this.unsubscribeRecaptcha();

      this.recaptchaSubcription = this.recaptchaV3Service.execute("signUpForm")
      .pipe(finalize(() => this.loadingService.loadingOff()))
      .subscribe({
        next: async (data) => await this.callApi(data),
        error: () => this.showRecaptchaError()
      });
      this.disableSubmit = false;

    }catch (err){
      this.disableSubmit = false;
      this.messageService.showMessage('Signup Failed, Please try again later!', 'error');
      return;
    }
  }

  async callApi(V3Token: string){
        const dto: signupModel = {
        fullname: this.fullname.value,
        email: this.email.value,
        password: this.password.value,
        confirmPassword: this.confirmPassword.value,
        googleRecaptchaToken: V3Token
      }

      const response = await this.accountService.signup(dto);

      if(response == HttpResponseModel.Ok){
        
      this.messageService.showMessage('Signup Successful, Please login!', 'success');
        this.signUpForm.reset();
      }
      if(response == HttpResponseModel.InternalServerError){
      this.messageService.showMessage('Signup Failed, Please try again later!', 'error');
      }
  }

  private unsubscribeRecaptcha(){
    if(this.recaptchaSubcription){
      this.recaptchaSubcription.unsubscribe();
    }
  }

  private showRecaptchaError(){
    this.messageService.showMessage("Failed to Verify Recaptcha", 'error');
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

  ngOnDestroy(): void
  {
    if(this.recaptchaSubcription)
      this.recaptchaSubcription.unsubscribe();
  }
}
