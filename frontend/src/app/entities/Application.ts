export interface IApplication
{
    id?: number;
    nationalRegisterNr: string | null,
    firstname: string | null,
    lastname : string | null,
    birthplace: string | null,
    birthdate: Date | null,
    mainProfession: string | null,
    jobTitle: string | null,
    gradeOrRank: string | null,
    initiator: string | null,
    salaryScale: string | null,
    distinctionsReceived: string | null,
    totYearService : number | null,
    totMonthService : number | null,
    resultEvaluation: string | null,
    sanctions: string | null,
    status: string | null,
    proposedHonoraryDistinction: string | null,
    reportAboutInvolved: string| null,
    certificate: string| null,
    decision: string| null,
    decisionTranslated: string| null,
    advice: string| null
}
