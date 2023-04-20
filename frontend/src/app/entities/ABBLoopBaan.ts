export interface IABBLoopBaan {
    nationalRegisterNr: string;
    mainProfession: string;
    jobTitle: string;
    gradeOrRank: string;
    salaryScale: string;
    career: ILoopBaanItem[];
  }
  
  export interface ILoopBaanItem {
    jobTitle: string;
    grade: string;
    fromDate: Date;
    toDate: Date | null;
    performanceBreach: number; //is normaal number
    naturePerformances: string;
  }