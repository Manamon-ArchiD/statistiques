export interface storeStatsInterface {
    numberOfTransaction: number;
    mostTradedHour: ({ datetime: string; trades: number } | undefined)[];
    totalAmountOfPurchases: number;

    // liste des 3 plus gros utilisateur du store avec nombre de trade et montant d'achat
    biggerStoreUserOfTheDay: ({ userId: number; trades: number; amountOfPurchases: number } | undefined)[];
}
