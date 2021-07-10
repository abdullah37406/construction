import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  val;
  pageYoffset = 20;
  @HostListener('window:scroll', ['$event']) onScroll(event) {
    this.pageYoffset = window.pageYOffset;
  }

  constructor(private scroll: ViewportScroller) { }
  
  ngOnInit(): void {
   // this.ours('about');
  }

  scrollToTop() {
    this.scroll.scrollToPosition([0, 0]);
  }
  ours(value){
    let a= document.getElementById("about");
    let h = document.getElementById("history");
    let s = document.getElementById("service");
    let ap = document.getElementById("approach");
    a.style.display="none";
    h.style.display="none";
    s.style.display="none";
    ap.style.display="none";  

    let show= document.getElementById(value)
    show.style.display="block";
    debugger
  }
}
