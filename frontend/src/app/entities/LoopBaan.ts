import { IAanvraag } from "./Aanvraag";

 export interface ILoopBaan{
    id: number;
    graadOfRang: string;
    van : Date;
    tot : Date
    prestatiebreuk : string;
    aardPrestaties : string;
   aanvraag: IAanvraag;
}   