export interface IPerson
{
    id?: number;
    rijksregisternummer: string | null,
    voornaam: string | null,
    achternaam : string | null,
    geboortedatum: Date | null,
    geboorteplaats: string | null,
    straat: string | null,
    huisnummer: string | null,
    postcode: string | null,
    stad: string | null,
}
