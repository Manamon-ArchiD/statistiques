export interface summarizeStatsInterface {
    numberOfMatch: number;

    // les 3 plus grand joueurs avec leur nombre de match completer du nombre de match
    biggerPlayersEver: ({ playerId: number; matches: number } | undefined)[];
    numberOfTrasaction: number;
    numberOfCreditTrade: number;
    numberOfPlayerAccount: number;
}