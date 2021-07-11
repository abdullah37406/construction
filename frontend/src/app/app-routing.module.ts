import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { NavigationComponent } from './feed/navigation/navigation.component';
import { AddProjectComponent } from './admin-panel/add-project/add-project.component';
import { AboutUsComponent } from './feed/about-us/about-us.component';
import { ProjectsComponent } from './feed/projects/projects.component';
import { ExpertiseComponent } from './feed/expertise/expertise.component';
import { ContactComponent } from './feed/contact/contact.component';
import { AdminNavigationComponent } from './admin-panel/admin-navigation/admin-navigation.component';
import { UpdateProjectComponent } from './admin-panel/update-project/update-project.component';
import { EditAboutUsComponent } from './admin-panel/edit-about-us/edit-about-us.component';



const routes: Routes = [
  // {
  //   path: '',
  //   component: LoginComponent
  //   // canActivate: [AuthGuard]
  // },
  {
    path: '',
    component: NavigationComponent,
    // children: [
    //   {
    //     path: '', redirectTo: 'about-us', pathMatch: 'full'
    //   },
    //   {
    //     path: 'about-us', component: AboutUsComponent
    //   },
    //   {
    //     path: 'projects', component: ProjectsComponent
    //   },
    //   {
    //     path: 'expertise', component: ExpertiseComponent
    //   },
    //   {
    //     path: 'contact', component: ContactComponent
    //   },
    //   {
    //     path: 'add-project', component: AddProjectComponent
    //   },
    // ]
  },
  {
    path: 'admin-nav',
    component: AdminNavigationComponent,
    children: [
      {
        path: '', redirectTo: 'addProject', pathMatch: 'full'
      },
      {
        path: 'addProject', component: AddProjectComponent
      },
      {
        path: 'updateProject', component: UpdateProjectComponent
      },
      {
        path: 'editAboutUs/:our', component: EditAboutUsComponent
      },
    ]
  },
  {
    path: '**', redirectTo: 'feed'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
