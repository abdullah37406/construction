import { AuthGuard } from './auth.guard';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenStorageService } from '../auth/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class NotLoggedInGuard implements CanActivate {
  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private authGuard: AuthGuard
  ) { }

  canActivate() {
    if (!this.tokenStorage.isTokenExpired()) {
      return true;
    }

    this.router.navigate(['']);
    return false;
  }
}
