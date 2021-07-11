import { ProjectImagesInfo } from "./projectImages-info";

export class AboutUsInfo {
    id: string;
    detail: string;
    type: string;
    imageData : ProjectImagesInfo[];
    constructor(){
        this.imageData=[];
    }
}
