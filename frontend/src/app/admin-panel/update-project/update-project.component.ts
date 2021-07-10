import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent implements OnInit {

  constructor() { }
  searchText: string = '';
  copylistOfData = [];
  headElements = ['Sr No', 'Proj Name', 'Image', 'Client'];

  ngOnInit(): void {
  }
  search(search) {
    const targetValue: any[] = [];
    this.copylistOfData.forEach((value: any) => {
      let keys = Object.keys(value);
      for (let i = 0; i < keys.length; i++) {
        if (value[keys[i]] && (value[keys[i]].toString().toLocaleLowerCase().includes(search))){
          targetValue.push(value);
          break;
        }
      }
    });
    // this.memberinfo = targetValue;
    debugger
  }
}
