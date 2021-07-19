import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { AuthService } from 'src/app/auth/auth.service';
import { ExpertiseInfo } from 'src/app/models/expertise-info';
import { ProjectInfo } from 'src/app/models/project-info';

@Component({
  selector: 'app-expertise',
  templateUrl: './expertise.component.html',
  styleUrls: ['./expertise.component.css']
})
export class ExpertiseComponent implements OnInit {

  imagesArray=[];
  pageYoffset = 20;
  expertyInfo = new ExpertiseInfo();
  expertyInfoArray: ExpertiseInfo[]=[];
  searchText: string = '';
  projInfo: ProjectInfo[] = [];
  oneProjInfo = new ProjectInfo();
  projId = new ProjectInfo();
  iconSrc = "http://localhost:8000/profilePicture/";
  dotPosition = 'left';
  projDetail = "";
  prvExp;
  onCloseExp;
  imgSrc = "http://localhost:8000/profilePicture/";

  @HostListener('window:scroll', ['$event']) onScroll(event) {
    this.pageYoffset = window.pageYOffset;
  }

  constructor(private scroll: ViewportScroller,
    private Jarwis: AuthService,
    private snotifyService: ToastrService,

  ) { }

  ngOnInit(): void {
    this.getDetails();
  }
  getDetails() {
    this.Jarwis.getExpertySectionDetail().subscribe(
      data => this.handleDetail(data),
      error => this.handleError(error)
    )
    this.getExpertise();
  }
  getExpertise() {

    this.Jarwis.getAllExpertise().subscribe(
      data => this.handleExpertise(data),
      error => this.handleError(error)
    )
  }
  handleDetail(data) {
    this.expertyInfo = data.data;
    var modalcon = document.getElementById("modal-con");
    var div = document.createElement('div');
    div.innerHTML = this.expertyInfo[0].detail;
    div.id = "about-detail";
    modalcon.appendChild(div);
  }
  handleExpertise(data) {
   this.expertyInfoArray=data.data; 
  }
  handleError(error) {
    this.snotifyService.clear();
    this.snotifyService.error(error.error.reason, '', {
      closeButton: true,
    });
  }
  scrollToTop() {
    this.scroll.scrollToPosition([0, 0]);
  }
  showExpertyProjects(experty){
    this.prvExp=experty;
    this.onCloseExp=experty;
    this.Jarwis.showExpertyProjects(experty).subscribe(
      data => this.handleExpertyProjects(data),
      error => this.handleError(error)
    );
  }
  handleExpertyProjects(data){
    
   let x=document.getElementById("allExpertise");
    x.style.display="none";
    let y=document.getElementById("projectsExperties");
    y.style.display="block";
    this.projInfo = data.data;

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
    this.showExpertyProjects(this.onCloseExp);

    let x = document.getElementById("all");
    x.style.display = "flex";

    let y = document.getElementById("specific");
    y.style.height = "0";
  }
  goBack(){
    let x=document.getElementById("allExpertise");
    x.style.display="flex";
    let y=document.getElementById("projectsExperties");
    y.style.display="none";
    debugger
  }
}
