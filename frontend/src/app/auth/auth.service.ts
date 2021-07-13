import { TokenStorageService } from './token-storage.service';
import { LoginInfo } from './../models/login-info';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { JwtResponse } from './jwt-response';
import { MemberInfo } from '../models/member-info';
import { ImagesInfo } from '../models/images-info';
import { Template } from '../models/templates';
import { CardInfo } from '../models/card-info';
import { ProjectInfo } from '../models/project-info';
import { AboutUsInfo } from '../models/aboutUs-info';
import { ExpertiseInfo } from '../models/expertise-info';


const localUrl = 'http://localhost:8000/api';
// const localUrl1 = 'http://localhost:8000/';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private baseUrl = 'http://bitesbraces.store/api';
  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) { }

  public attemptAuth(credentials: LoginInfo): Observable<JwtResponse> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': localUrl,
      })
    };
    return this.http.post<JwtResponse>(`${localUrl}/auth/signin`, credentials, httpOptionsSaved);
  }

  public createMemberRecord(info: MemberInfo): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': localUrl,
        'x-access-token': this.tokenStorage.getToken()
      })
    };
    return this.http.post<string>(`${localUrl}/member/create`, info, httpOptionsSaved);
  }
// ................................................................................................  
  public addProject(info: ProjectInfo): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': localUrl,
        // 'x-access-token': this.tokenStorage.getToken()
      })
    };
    return this.http.post<string>(`${localUrl}/project/upload`, info, httpOptionsSaved);
  }
  public getAllProjects() {
    // : Observable<string>
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': localUrl,
        // 'x-access-token': this.tokenStorage.getToken()
      })
    };
    return this.http.get(`${localUrl}/allProjects`, httpOptionsSaved);
    // <string>
  }
  public getOneProjects(info: ProjectInfo): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': localUrl,
        // 'x-access-token': this.tokenStorage.getToken()
      })
    };
    return this.http.post<string>(`${localUrl}/getOneProject`, info, httpOptionsSaved);
  }
  public addAboutUsInfo(info: AboutUsInfo): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': localUrl,
        // 'x-access-token': this.tokenStorage.getToken()
      })
    };
    return this.http.post<string>(`${localUrl}/aboutUs/upload`, info, httpOptionsSaved);
  }
  public getAboutUsInfo(info: AboutUsInfo): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': localUrl,
        // 'x-access-token': this.tokenStorage.getToken()
      })
    };
    return this.http.post<string>(`${localUrl}/aboutUs/get`, info, httpOptionsSaved);
  }
  public addExpertySectionDetail(info: ExpertiseInfo): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': localUrl,
        // 'x-access-token': this.tokenStorage.getToken()
      })
    };
    return this.http.post<string>(`${localUrl}/addDetail`, info, httpOptionsSaved);
  }
  public getExpertySectionDetail() {
    // : Observable<string>
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': localUrl,
        // 'x-access-token': this.tokenStorage.getToken()
      })
    };
    return this.http.get(`${localUrl}/getDetail`, httpOptionsSaved);
    // <string>
  }
  // ----------------------------------------------------------------------------------
  public updateMemberRecord(info: MemberInfo): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': localUrl,
        'x-access-token': this.tokenStorage.getToken()
      })
    };
    return this.http.post<string>(`${localUrl}/member/update`, info, httpOptionsSaved);
  }
  public getMembersNo(): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': localUrl,
        'x-access-token': this.tokenStorage.getToken()
      })
    };
    return this.http.get<string>(`${localUrl}/memberno/get`, httpOptionsSaved);
  }

  public addMemberProfile(info: MemberInfo): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': localUrl,
       'x-access-token': this.tokenStorage.getToken()
      })
    };
    return this.http.post<string>(`${localUrl}/memberProfileImg/add`, info, httpOptionsSaved);
  }

  public getCnicNo(): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': localUrl,
        'x-access-token': this.tokenStorage.getToken()
      })
    };
    return this.http.get<string>(`${localUrl}/memberCnicNo/get`, httpOptionsSaved);
  }
  public addMemberCNIC(info: MemberInfo): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': localUrl,
       'x-access-token': this.tokenStorage.getToken()
      })
    };
    return this.http.post<string>(`${localUrl}/memberCnicImg/add`, info, httpOptionsSaved);
  }
  public addTemplate(data: Template[]): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': localUrl,
       'x-access-token': this.tokenStorage.getToken()
      })
    };
    return this.http.post<string>(`${localUrl}/template/add`, data, httpOptionsSaved);
  }

  public getAllMembers(offset:number, limit:number) {
    // : Observable<string>
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': localUrl,
        'x-access-token': this.tokenStorage.getToken()
      })
    };
    return this.http.get(`${localUrl}/${offset}/${limit}/members`, httpOptionsSaved);
    // <string>
  }
  public viewMembersData(credentials: MemberInfo): Observable<JwtResponse> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': localUrl,
        'x-access-token': this.tokenStorage.getToken()
      })
    };
    return this.http.post<JwtResponse>(`${localUrl}/viewMemberData`, credentials, httpOptionsSaved);
  }
  public updateCardInfo(data: CardInfo): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': localUrl,
       'x-access-token': this.tokenStorage.getToken()
      })
    };
    return this.http.post<string>(`${localUrl}/cardInfo/add`, data, httpOptionsSaved);
  }
}


