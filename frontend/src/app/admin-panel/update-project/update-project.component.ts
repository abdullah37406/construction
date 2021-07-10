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
  searchText: string = '';
  copylistOfData = [];
  headElements = ['Sr No', 'Proj Name', 'Image', 'Client'];
  iconSrc = "http://localhost:8000/profilePicture/";
  ngOnInit(): void {
    this.Jarwis.getAllProjects().subscribe(
      data => this.handleData(data),
      error => this.handleError(error)
    );
  }
  projInfo: ProjectInfo[] = [];
  handleData(data) {
    this.projInfo = data.data;
    this.copylistOfData = this.projInfo;
  }
  handleError(error) {
    this.snotifyService.clear();
    this.snotifyService.error('Unable to get Data', '', {
      closeButton: true,
    });
  }
  search(search) {
    const targetValue: any[] = [];
    this.copylistOfData.forEach((value: any) => {
      let keys = Object.keys(value);
      for (let i = 0; i < keys.length; i++) {
        if (value[keys[i]] && (value[keys[i]].toString().toLocaleLowerCase().includes(search))) {
          targetValue.push(value);
          break;
        }
      }
    });
    this.projInfo = targetValue;
  }
}
