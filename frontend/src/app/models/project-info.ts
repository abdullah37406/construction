import { ProjectImagesInfo } from "./projectImages-info";

export class ProjectInfo {
    id: string;
    projName: string;
    projDescription: string;
    clientName: string;
    clientContact: string;
    projDetail: string;
    // iconImgPath: string;
    projCategory: string;
    createdBy: number;
    imageData : ProjectImagesInfo[];

    // memberImages : ImagesInfo[];
    constructor(){
       
        // this.memberImages=[];
       
    }
}