import { AddressInfo } from "./address-info";
import { ImagesInfo } from "./images-info";
import { InterestInfo } from "./interest-info";
import { PersonalInfo } from "./personal-info";
import { ReferralInfo } from "./referral-info";
import { WorkDetailInfo } from "./workDetail-info";

export class MemberInfo {
    id: string;
    invoiceNo: string;
    membershipNo: string;
    name: string;
    email: string;
    personalNo: string;
    type: string;
    typeNo: string;
    mailingAddress: string;
    category: string;
    status: string;
    createdBy: number;
    personalInfo: PersonalInfo;
    interestInfo: InterestInfo[];
    addressInfo: AddressInfo[];
    referralInfo: ReferralInfo[];
    workDetailInfo: WorkDetailInfo;
    memberWorkDetail: WorkDetailInfo;
    memberInterests:InterestInfo[];
    memberAddresses: AddressInfo[];
    memberReferrals: ReferralInfo[];
    imageData : ImagesInfo[];
    memberImages : ImagesInfo[];
    constructor(){
        this.personalInfo = new PersonalInfo();
        this.workDetailInfo = new WorkDetailInfo();
        this.memberWorkDetail= new WorkDetailInfo();
        this.memberImages=[];
        this.memberInterests=[];
        this.memberAddresses=[];
        this.memberReferrals=[];
    }
}

