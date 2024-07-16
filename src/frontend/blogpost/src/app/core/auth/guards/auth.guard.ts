import {CanActivateFn, RedirectCommand, Router} from "@angular/router";
import {inject} from "@angular/core";
import {AccountService} from "../services/account.service";
import {absoluteRoutes} from "../../../shared/misc/absolute-route.constants";

export const AuthGuard : CanActivateFn = async () => {
    const accountService = inject(AccountService);
    const router = inject(Router);

    if (await accountService.checkExpirationOfJwt()){
      return true;
    }else{
      return new RedirectCommand(router.parseUrl(absoluteRoutes.LOGIN));
    }
}
