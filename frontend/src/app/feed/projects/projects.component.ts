import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { ProjectInfo } from 'src/app/models/project-info';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor(
    private Jarwis: AuthService,
    private snotifyService: ToastrService,
  ) { }
  searchText: string = '';
  projInfo: ProjectInfo[] = [];
  iconSrc = "http://localhost:8000/profilePicture/";
  
  ngOnInit(): void {
    this.Jarwis.getAllProjects().subscribe(
      data => this.handleData(data),
      error => this.handleError(error)
    );
  }
  handleData(data) {
    this.projInfo = data.data;
    debugger
  }
  handleError(error) {
    this.snotifyService.clear();
    this.snotifyService.error('Unable to get Data', '', {
      closeButton: true,
    });
  }
  array = ["b1.jpg", "b2.jpg","b3.jpg","b4.jpg"];
  dotPosition = 'left';
 
  carousel(){
    let x= document.getElementById("all");
    x.style.display="none";

    let y= document.getElementById("specific");
    y.style.height="auto";
  }
  close(){
    let x= document.getElementById("all");
    x.style.display="block";

    let y= document.getElementById("specific");
    y.style.height="0";
  }
}
