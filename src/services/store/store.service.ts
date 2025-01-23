import prisma from "../../db/prisma.client";
import {matchInterface} from "../../interfaces/match/match.interface";
import {matchStatsInterface} from "../../interfaces/match/match.stats.interface";
import {storeStatsInterface} from "../../interfaces/store/store.stats.interface";
import {storeInterface} from "../../interfaces/store/store.interface";
import {utilsDate} from "../utils/utilsDate";

export class StoreService {

    // Renvoie les stats des match pour un jour donné en parametre
    static async getStatStoreByDay(day: Date){

        // Recupere tout les stats du stores du jours spécifié
        const storeStatsOfTheDay = await this.getStoreStatsByDay(day);

        // Recupere le total complet de chose acheter dans le store
        const totalOfPurchases: number = storeStatsOfTheDay.reduce((total: number, elem: { price: number }) => total + elem.price, 0);

        // Creer le dto de reponse de stats
        const storesStats: storeStatsInterface = {
            numberOfTransaction: storeStatsOfTheDay.length,
            mostTradedHour: await this.getMostTradedHours(storeStatsOfTheDay),
            totalAmountOfPurchases: totalOfPurchases,
            biggerStoreUserOfTheDay: await this.getBiggerTraders(storeStatsOfTheDay)
        }

        return storesStats
    }

    // Renvoie l'heure ou il y a eu le plus d'utilisation du store
    static async getMostTradedHours(matches: storeInterface[]) {
        const numberOfTradePerHour: Record<string, number> = {}

        // Parcours les match
        for (const match of matches) {

            // On regarde toutes les heure de match et on fait un compteur pour chqune d'entre elle
            if (numberOfTradePerHour[utilsDate.roundToHour(match.datetime).toString()] == undefined){
                numberOfTradePerHour[utilsDate.roundToHour(match.datetime).toString()] = 1
            } else {
                numberOfTradePerHour[utilsDate.roundToHour(match.datetime).toString()] += 1
            }
        }

        // On convertit le record en tableau
        const arrayNumberTrade = Object.entries(numberOfTradePerHour).map(([key, value]) => ({
            datetime: key,
            trades: value
        }));

        // On trie par les plus grosse heure
        const sortedByTrades = arrayNumberTrade.sort((a, b) => b.trades - a.trades);

        // On creer le tableau de retour
        const resultArray = []

        // On aliment l'array de reponse si moins de 3 heures alors on met undefined
        resultArray[0] = sortedByTrades.at(0) != undefined ? sortedByTrades.at(0): undefined
        resultArray[1] = sortedByTrades.at(1) != undefined ? sortedByTrades.at(1): undefined
        resultArray[2] = sortedByTrades.at(2) != undefined ? sortedByTrades.at(2): undefined

        // On les print
        return resultArray
    }

    // Renvoie les 3 plus grand utilisateur du tableau de stats
    static async getBiggerTraders(stores: storeInterface[]){
        const numberOfTradePerPlayer: Record<number, number> = {}

        // Parcours les match
        for (const trade of stores){

            // On traite le playerId1
            if (numberOfTradePerPlayer[trade.userId] == undefined){
                numberOfTradePerPlayer[trade.userId] = 1
            } else {
                numberOfTradePerPlayer[trade.userId] += 1
            }
        }

        // On convertit le record en tableau
        const arrayNumberTrade = Object.entries(numberOfTradePerPlayer).map(([key, value]) => ({
            userId: Number(key),
            trades: value,
            amountOfPurchases: 0
        }));

        // On trie par les plus gros trader
        const sortedByMatches = arrayNumberTrade.sort((a, b) => b.trades - a.trades);

        // On creer le tableau de retour
        const resultArray = []

        // On aliment l'array de reponse si moins de 3 joueur alors on met undefined
        resultArray[0] = sortedByMatches.at(0) != undefined ? sortedByMatches.at(0): undefined
        resultArray[1] = sortedByMatches.at(1) != undefined ? sortedByMatches.at(1): undefined
        resultArray[2] = sortedByMatches.at(2) != undefined ? sortedByMatches.at(2): undefined

        // recupere le total des achat pour les joueur dans le tableau retour
        if (resultArray[0] !== undefined) {
            resultArray[0].amountOfPurchases = await this.getTotalAmountOfPurchasesOfUser(resultArray[0].userId, stores);
        } else {
            resultArray[0] = undefined;
        }

        if (resultArray[1] !== undefined) {
            resultArray[1].amountOfPurchases = await this.getTotalAmountOfPurchasesOfUser(resultArray[1].userId, stores);
        } else {
            resultArray[1] = undefined;
        }

        if (resultArray[2] !== undefined) {
            resultArray[2].amountOfPurchases = await this.getTotalAmountOfPurchasesOfUser(resultArray[2].userId, stores);
        } else {
            resultArray[2] = undefined;
        }

        // On les print
        return resultArray
    }

    static async getTotalAmountOfPurchasesOfUser(userId: number, trades: storeInterface[]): Promise<number> {
        return trades
            .filter(trade => trade.userId === userId)
            .reduce((sum, trade) => sum + trade.price, 0);
    }

    // Renvoie tout les stats de stats de store present dans la table pour le jour passé en parametre
    static async getStoreStatsByDay(day: Date){

        // On creer un Date avec l'heure a 0 et l'autre avec l'heure a 23h59min59s
        // Tout en gardant le jours fournit par le parametre
        const dayStart = new Date(day.setHours(0,0,0,0))
        const dayEnd = new Date(day.setHours(23,59,59,59))

        // On recherche en base les rusultat correspondant au jours passé en parametre
        const stores = await prisma.storeStat.findMany({
            where: {
                datetime: {
                    gte: dayStart,
                    lte: dayEnd,
                }
            }
        })

        // On les map dans les dto
        const storeInterfaces: storeInterface[] = stores.map((store) => ({
            id: store.id,
            datetime: store.datetime,
            userId: store.userId,
            itemId: store.itemId,
            price: store.price,
        }));

        // On les renvoie
        return storeInterfaces;
    }
}