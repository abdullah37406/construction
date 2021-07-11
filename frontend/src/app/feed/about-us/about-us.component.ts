import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  white;
  prev; color="aboutHead";
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
  ours(value) {
    let a = document.getElementById("about");
    let h = document.getElementById("history");
    let s = document.getElementById("service");
    let ap = document.getElementById("approach");
    a.style.display = "none";
    h.style.display = "none";
    s.style.display = "none";
    ap.style.display = "none";

    this.prev = this.color;
    // if (this.prev != null) {
      let white = document.getElementById(this.prev);
      white.style.color = "#fff";
    // }
    let show = document.getElementById(value);
    show.style.display = "block";
    this.color = value + "Head";
    let col = document.getElementById(this.color);
    col.style.color = "#1890ff";
    debugger
  }
}
