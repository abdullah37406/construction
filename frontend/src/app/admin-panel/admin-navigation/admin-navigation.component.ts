import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-navigation',
  templateUrl: './admin-navigation.component.html',
  styleUrls: ['./admin-navigation.component.css']
})
export class AdminNavigationComponent implements OnInit {
  theme = true;
  constructor() { }

  ngOnInit(): void {
  }

}
