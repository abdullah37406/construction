import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { ProjectInfo } from 'src/app/models/project-info';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent implements OnInit {

  constructor(
    private Jarwis: AuthService,
    private snotifyService: ToastrService,
  ) { }
 
  ngOnInit(): void {
   
  }
}
