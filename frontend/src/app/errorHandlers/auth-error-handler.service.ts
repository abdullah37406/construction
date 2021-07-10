import { Injectable, Injector, ErrorHandler } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthErrorHandlerService implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error: any) {
    const router = this.injector.get(Router);
    // if (error.rejection.status === 401 || error.rejection.status === 403) {
    //   // router.navigate(['']);
    // }

    throw error;
  }
}
