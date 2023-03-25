export interface IAanvraag
{
    id?: number;
    rijksregisternummer: string | null,
    voornaam: string | null,
    achternaam : string | null,
    geboorteplaats: string | null,
    geboortedatum: Date | null,
    hoofdBeroep: string | null,
    functieTitel: string | null,
    graadOfRang: string | null,
    initiatiefnemer: string | null,
    salarisschaal: string | null,
    alOntvangenOnderscheidingen: string | null,
    totJarenDienst : number | null,
    totMaandenDienst : number | null,
    res_evaluatie: string | null,
    tuchtOfStrafsacties: string | null,
    status: string | null,
    voorgesteldeEreteken: string | null,
    verslagBetrokkene: string| null
}
