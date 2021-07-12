import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { AboutUsInfo } from 'src/app/models/aboutUs-info';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  white;
  prevId; currentId = "headAboutus";
  pageYoffset = 20;
  aboutUsInfo = new AboutUsInfo();
  iconSrc = "";

  @HostListener('window:scroll', ['$event']) onScroll(event) {
    this.pageYoffset = window.pageYOffset;
  }

  constructor(
    private scroll: ViewportScroller,
    private Jarwis: AuthService,
  ) { }

  ngOnInit(): void {
    this.aboutUsInfo.type = "Aboutus";
    this.Jarwis.getAboutUsInfo(this.aboutUsInfo).subscribe(
      data => this.handleData(data),
      error => this.handleError(error)
    )
  }

  scrollToTop() {
    this.scroll.scrollToPosition([0, 0]);
  }
  ours(value) {
    debugger
    this.prevId = this.currentId;
    debugger
    let white = document.getElementById(this.prevId);
    white.style.color = "#fff";
    debugger
    this.currentId = "head" + value;
    debugger
    let color = document.getElementById(this.currentId);
    color.style.color = "#1890ff";
    debugger




    this.aboutUsInfo.type = value;
    debugger
    this.Jarwis.getAboutUsInfo(this.aboutUsInfo).subscribe(
      data => this.handleData(data),
      error => this.handleError(error)
    )
  }
  handleData(data) {
    debugger;

    if (document.getElementById("about-detail")) {
      var del = document.getElementById("about-detail");
      del.remove();
    }
    this.aboutUsInfo = data.data;
    var modalcon = document.getElementById("modal-con");
    var div = document.createElement('div');
    div.innerHTML = this.aboutUsInfo.detail;
    div.id = "about-detail";
    modalcon.appendChild(div);
    this.iconSrc = "http://localhost:8000/profilePicture/" + data.data.projectImages[0].imgPath;

  }
  handleError(error) {

  }
}
