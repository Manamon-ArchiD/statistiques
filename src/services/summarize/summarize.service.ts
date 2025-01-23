import {summarizeStatsInterface} from "../../interfaces/summarize/summarize.stats.interface";
import prisma from "../../db/prisma.client";
import {matchInterface} from "../../interfaces/match/match.interface";
import {storeInterface} from "../../interfaces/store/store.interface";
import {userInterface} from "../../interfaces/user/user.interface";
import {MatchService} from "../match/match.service";

export class SummarizeService {
    static async getStatSummarize(): Promise<summarizeStatsInterface>{

        // Recupere et map les donnes de tout les stats de match en base
        const allMatchesRequest = await prisma.matchStat.findMany();
        const allMatchInterfaces: matchInterface[] = allMatchesRequest.map((match) => ({
            id: match.id,
            datetime: match.datetime,
            matchId: match.matchId,
            playerId1: match.playerId1,
            playerId2: match.playerId2,
        }));

        // Recupere et map les donnes de tout les stats de store en base
        const allTradesRequest = await prisma.storeStat.findMany();
        const allTradeInterfaces: storeInterface[] = allTradesRequest.map((trade) => ({
            id: trade.id,
            datetime: trade.datetime,
            userId: trade.userId,
            itemId: trade.itemId,
            price: trade.price
        }));

        // Recupere et map les donnes de tout les stats de user en base
        const allUsersRequest = await prisma.userStat.findMany();
        const allUserInterfaces: userInterface[] = allUsersRequest.map((trade) => ({
            id: trade.id,
            datetime: trade.datetime,
        }));

        return {
            numberOfMatch: allMatchInterfaces.length,
            biggerPlayersEver: await MatchService.getBiggerPlayers(allMatchInterfaces),
            numberOfTrasaction: allTradeInterfaces.length,
            numberOfCreditTrade: this.getTotalPrice(allTradeInterfaces),
            numberOfPlayerAccount: allUserInterfaces.length
        }
    }

    // Renvoie la somme de tout les trade en base
    static getTotalPrice(trades: storeInterface[]): number {
        return trades.reduce((total, trade) => total + trade.price, 0);
    }
}