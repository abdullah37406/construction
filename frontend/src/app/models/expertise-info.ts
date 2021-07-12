import { ProjectImagesInfo } from "./projectImages-info";

export class ExpertiseInfo {
    id: string;
    detail: string;
    type: string;
    imageData : ProjectImagesInfo[];
    constructor(){
        this.imageData=[];
    }
}
