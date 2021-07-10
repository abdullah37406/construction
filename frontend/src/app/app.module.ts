import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CustomMaterialModule } from './core/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { JwtModule } from '@auth0/angular-jwt';
import { IconsModule } from 'angular-bootstrap-md';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { DatePipe, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en'
import { TextMaskModule } from 'angular2-text-mask';
import { NgxPaginationModule } from 'ngx-pagination'
import { NzSelectModule } from 'ng-zorro-antd';
import { QRCodeModule } from 'angularx-qrcode';
import { AboutUsComponent } from './feed/about-us/about-us.component';
import { ProjectsComponent } from './feed/projects/projects.component';
import { ExpertiseComponent } from './feed/expertise/expertise.component';
import { ContactComponent } from './feed/contact/contact.component';
import { SectorsComponent } from './feed/sectors/sectors.component';
import { AddProjectComponent } from './admin-panel/add-project/add-project.component';
import { AdminNavigationComponent } from './admin-panel/admin-navigation/admin-navigation.component';
import { HomeComponent } from './feed/home/home.component';
import { NavigationComponent } from './feed/navigation/navigation.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { UpdateProjectComponent } from './admin-panel/update-project/update-project.component';
import { AngularEditorModule } from '@kolkov/angular-editor';

registerLocaleData(en);
export function tokenGetter() {
  return localStorage.getItem('access_token');
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AboutUsComponent,
    ProjectsComponent,
    ExpertiseComponent,
    ContactComponent,
    SectorsComponent,
    AddProjectComponent,
    AdminNavigationComponent,
    HomeComponent,
    AppComponent,
    NavigationComponent,
    AdminNavigationComponent,
    UpdateProjectComponent
  ],
  imports: [
    AngularEditorModule ,
    FontAwesomeModule,
    NzTabsModule,
    NzCarouselModule,
    BrowserModule,
    QRCodeModule,
    NzMenuModule,
    NzSwitchModule,
    // NzIconModule,
    NzSelectModule,
    // NzDropDownModule ,
    FlexLayoutModule,
    BrowserAnimationsModule,
    LayoutModule,
    IconsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule,
    NgxPaginationModule,
    CustomMaterialModule,
    ToastrModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:8080'],
        blacklistedRoutes: ['localhost:8080/api/auth/signin']
      }
    }),
    HttpClientModule,
    AppRoutingModule

  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
