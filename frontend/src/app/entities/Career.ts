import { IApplication } from "./Application";

 export interface ICareer{
    id: number;
    grade: string;
    fromDate : Date;
    toDate : Date
    performanceBreach : number;
    naturePerformances : string;
    application: IApplication;
}   