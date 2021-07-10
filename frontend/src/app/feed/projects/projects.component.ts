import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor() { }
  array = ["b1.jpg", "b2.jpg","b3.jpg","b4.jpg"];
  dotPosition = 'left';
  ngOnInit() {

  }
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
