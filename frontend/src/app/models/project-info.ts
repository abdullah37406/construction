import { ProjectImagesInfo } from "./projectImages-info";

export class ProjectInfo {
    id: string;
    projName: string;
    projDescription: string;
    clientName: string;
    clientContact: string;
    projDetail: string;
    projCategory: string;
    createdBy: number;
    imageData : ProjectImagesInfo[];
    constructor(){
        this.imageData=[];
    }
}