export interface matchStatsInterface {
    numberOfMatch: number;

    // liste de 3 datetime avec le nombre de match pendant ses heures (si moins de 3 alors compléter par undefined)
    mostPlayedHours: ({ datetime: string; matches: number } | undefined)[];

    // liste de 3 joueur avec le nombre de match qu'ils ont fait (si moins de 3 alors compléter par undefined)
    biggerPlayersOfTheDay: ({ playerId: number; matches: number } | undefined)[];
}
