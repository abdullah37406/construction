import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { ProjectInfo } from 'src/app/models/project-info';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  pageYoffset = 20;
  @HostListener('window:scroll', ['$event']) onScroll(event) {
    this.pageYoffset = window.pageYOffset;
  }

  constructor(
    private scroll: ViewportScroller,
    private Jarwis: AuthService,
    private snotifyService: ToastrService,
  ) { }
  searchText: string = '';
  projInfo: ProjectInfo[] = [];
  oneProjInfo = new ProjectInfo();
  projId = new ProjectInfo();
  iconSrc = "http://localhost:8000/profilePicture/";
  imagesArray = [];
  dotPosition = 'left';
  projDetail = "";
  ngOnInit(): void {
    this.getProjects();
  }
  getProjects() {
    this.Jarwis.getAllProjects().subscribe(
      data => this.handleData(data),
      error => this.handleError(error)
    );
  }
  handleData(data) {
    this.projInfo = data.data;
  }
  handleError(error) {
    this.snotifyService.clear();
    this.snotifyService.error('Unable to get Data', '', {
      closeButton: true,
    });
  }
  carousel(id) {
    this.imagesArray = [];
    if (document.getElementById("projDetail")) {
      var del = document.getElementById("projDetail");
      del.remove();
    }
    this.projId.id = id
    this.Jarwis.getOneProjects(this.projId).subscribe(
      data => this.handleOneData(data),
      error => this.handleOneError(error)
    );
    let x = document.getElementById("all");
    x.style.display = "none";

    let y = document.getElementById("specific");
    y.style.height = "auto";
  }
  handleOneData(data) {
    this.oneProjInfo = data.data;
    this.oneProjInfo.imageData = data.data.projectImages;
    this.oneProjInfo.imageData.forEach(element => {
      this.imagesArray.push(element.imgPath)
    });
    var modalcon = document.getElementById("modal-con");
    var div = document.createElement('div');
    div.innerHTML = this.oneProjInfo.projDetail;
    div.id = "projDetail";
    modalcon.appendChild(div);
  }
  handleOneError(error) {
    this.snotifyService.clear();
    this.snotifyService.error('Unable to get Data', '', {
      closeButton: true,
    });
  }
  close() {
    this.imagesArray = [];
    var del = document.getElementById("projDetail");
    del.remove();
    this.getProjects();

    let x = document.getElementById("all");
    x.style.display = "block";

    let y = document.getElementById("specific");
    y.style.height = "0";
  }
  scrollToTop() {
    this.scroll.scrollToPosition([0, 0]);
  }
}
