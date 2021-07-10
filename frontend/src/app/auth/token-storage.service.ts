import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

const TOKEN_KEY = 'AuthToken';
const EMAIL_KEY = 'AuthEmail';
const EVENT_KEY = 'AuthEvent';



@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }
  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveEmail(email: string) {
    window.sessionStorage.removeItem(EMAIL_KEY);
    window.sessionStorage.setItem(EMAIL_KEY, email);
  }

  public getEmail(): string {
    return sessionStorage.getItem(EMAIL_KEY);
  }

  public saveEvent(event: string) {
    window.sessionStorage.removeItem(EVENT_KEY);
    window.sessionStorage.setItem(EVENT_KEY, event);
  }

  public getEvent(): string {
    const event = sessionStorage.getItem(EVENT_KEY) ? sessionStorage.getItem(EVENT_KEY) : '';
    window.sessionStorage.removeItem(EVENT_KEY);

    return event;
  }

  public getTokenExpirationDate(token: string): Date {
    let decoded = {
      exp: null,
      iat: null,
      id: null
    };
    decoded = jwt_decode(token);
    if (decoded === undefined) { return null; }

    const date = new Date(0);
    // console.log(decoded);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  public isTokenExpired(token?: string): boolean {
    if (!token) { token = this.getToken(); }
    if (!token) { return true; }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) { return false; }
    // return false;
    return !(date.valueOf() > new Date().valueOf());
  }

}
