
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const jwtHelper = inject(JwtHelperService);
  console.log("estou no auth-guard");
  const token = localStorage.getItem("jwt");
  if(token && !jwtHelper.isTokenExpired(token)) {
    return true;
  }

  return router.parseUrl('/login');
};
