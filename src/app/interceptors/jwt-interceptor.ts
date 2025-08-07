import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtHelper = inject(JwtHelperService);
  const token = localStorage.getItem('jwt');

  console.log("estou no interceptor");
  if(token && !jwtHelper.isTokenExpired(token)){
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  return next(req);
};
