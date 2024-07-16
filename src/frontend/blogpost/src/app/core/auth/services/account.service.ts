import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {firstValueFrom} from "rxjs";
import {MessageService} from "../../../shared/message/message.service";
import {loginModel} from "../models/login.model";
import {HttpResponseModel} from "../models/http-response.model";
import {AuthClaim, User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  #userSignal = signal<User>(null);
  user = this.#userSignal.asReadonly();

  private readonly http = inject(HttpClient);
  private readonly messageService = inject(MessageService);

  isLoggedIn = computed(() => !this.user);

  public async checkExpirationOfJwt(){
    const user = this.jwtCookieToUser();
    return user != null;
  }

  async login(dto: loginModel) : Promise<HttpResponseModel> {
    try {
      const login$ = this.http.post<User>(environment.V1.LOGIN, dto);

      const user = await firstValueFrom(login$);
      this.#userSignal.set(user);
      return HttpResponseModel.Ok;
    }
    catch (err){
      this.messageService.showMessage('Login Failed, Please try again later!', 'error');
      return HttpResponseModel.InternalServerError;
    }
  }

  async logout(): Promise<boolean> {
   try {
      await firstValueFrom(this.http.post<boolean>(environment.V1.LOGOUT, null));
      this.#userSignal.set(null);
      return true;
   } catch (err){
     this.messageService.showMessage('Logout Failed', 'error');
     return false;
   }
  }

  private async jwtCookieToUser(): Promise<User | null> {
    try {
      const user = await firstValueFrom(
        this.http.post<AuthClaim[]>(environment.V1.CHECK_TOKEN, null)
      );

      if (user) {
        const parsedUser = this.parseUserFromJwt(user);
        this.#userSignal.set(parsedUser);
        return parsedUser;
      }
      return null;
    }
    catch (err) {
      this.#userSignal.set(null);
      return null;
    }
  }

  private parseUserFromJwt(claims: Array<AuthClaim>): User {
    const data: Record<string, string> = {};

    claims.forEach((item) => {
      data[item.type] = item.value;
    });

    return {
      id: data?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] ?? null,
      name: data?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ?? null,
      email: data?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] ?? null,
      profilePicture: null
    };
  }
}
