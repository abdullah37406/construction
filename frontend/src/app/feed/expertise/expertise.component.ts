import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { ExpertiseInfo } from 'src/app/models/expertise-info';

@Component({
  selector: 'app-expertise',
  templateUrl: './expertise.component.html',
  styleUrls: ['./expertise.component.css']
})
export class ExpertiseComponent implements OnInit {

  pageYoffset = 20;
  expertyInfo = new ExpertiseInfo();

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
      data => this.handleData(data),
      error => this.handleError(error)
    )
  }
  handleData(data) {
    this.expertyInfo = data.data;
    var modalcon = document.getElementById("modal-con");
    var div = document.createElement('div');
    div.innerHTML = this.expertyInfo[0].detail;
    div.id = "about-detail";
    debugger
    modalcon.appendChild(div);
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
}
