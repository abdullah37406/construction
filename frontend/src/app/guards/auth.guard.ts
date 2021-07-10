import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenStorageService } from '../auth/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService
  ) { }

  canActivate() {
    if (this.tokenStorage.isTokenExpired()) {
      return true;
    }

    this.router.navigate(['/staff-panel']);
    return false;
  }

}
