import prisma from "../../db/prisma.client";
import {matchInterface} from "../../interfaces/match/match.interface";
import {matchStatsInterface} from "../../interfaces/match/match.stats.interface";
import {utilsDate} from "../utils/utilsDate";

export class MatchService {

    // Renvoie les stats des match pour un jour donné en parametre
    static async getStatMachByDay(day: Date){

        // Recupere tout les match du jours spécifié
        const matchesOfTheDay = await this.getMatchByDay(day);

        // Creer le dto de reponse de stats
        const matchesStats: matchStatsInterface = {
            numberOfMatch: matchesOfTheDay.length,
            mostPlayedHours: await this.getMostPlayedHours(matchesOfTheDay),
            biggerPlayersOfTheDay: await this.getBiggerPlayers(matchesOfTheDay)
        }

        return matchesStats
    }

    // Renvoie l'heure ou il y a eu le plus de match
    static async getMostPlayedHours(matches: matchInterface[]) {
        const numberOfMatchPerHour: Record<string, number> = {}

        // Parcours les match
        for (const match of matches) {

            // On regarde toutes les heure de match et on fait un compteur pour chqune d'entre elle
            if (numberOfMatchPerHour[utilsDate.roundToHour(match.datetime).toString()] == undefined){
                numberOfMatchPerHour[utilsDate.roundToHour(match.datetime).toString()] = 1
            } else {
                numberOfMatchPerHour[utilsDate.roundToHour(match.datetime).toString()] += 1
            }
        }

        // On convertit le record en tableau
        const arrayNumberMatch = Object.entries(numberOfMatchPerHour).map(([key, value]) => ({
            datetime: key,
            matches: value
        }));

        // On trie par les plus grosse heure
        const sortedByMatches = arrayNumberMatch.sort((a, b) => b.matches - a.matches);

        // On creer le tableau de retour
        const resultArray = []

        // On aliment l'array de reponse si moins de 3 heures alors on met undefined
        resultArray[0] = sortedByMatches.at(0) != undefined ? sortedByMatches.at(0): undefined
        resultArray[1] = sortedByMatches.at(1) != undefined ? sortedByMatches.at(1): undefined
        resultArray[2] = sortedByMatches.at(2) != undefined ? sortedByMatches.at(2): undefined

        // On les print
        return resultArray
    }

    // Renvoie les 3 plus grand joueur du tableau de stats
    static async getBiggerPlayers(matches: matchInterface[]){
        const numberOfMatchPerPlayer: Record<number, number> = {}

        // Parcours les match
        for (const match of matches){

            // On traite le playerId1
            if (numberOfMatchPerPlayer[match.playerId1] == undefined){
                numberOfMatchPerPlayer[match.playerId1] = 1
            } else {
                numberOfMatchPerPlayer[match.playerId1] += 1
            }

            // On traite le playerId2
            if (numberOfMatchPerPlayer[match.playerId2] == undefined){
                numberOfMatchPerPlayer[match.playerId2] = 1
            } else {
                numberOfMatchPerPlayer[match.playerId2] += 1
            }
        }

        // On convertit le record en tableau
        const arrayNumberMatch = Object.entries(numberOfMatchPerPlayer).map(([key, value]) => ({
            playerId: Number(key),
            matches: value
        }));

        // On trie par les plus gros joueur
        const sortedByMatches = arrayNumberMatch.sort((a, b) => b.matches - a.matches);

        // On creer le tableau de retour
        const resultArray = []

        // On aliment l'array de reponse si moins de 3 joueur alors on met undefined
        resultArray[0] = sortedByMatches.at(0) != undefined ? sortedByMatches.at(0): undefined
        resultArray[1] = sortedByMatches.at(1) != undefined ? sortedByMatches.at(1): undefined
        resultArray[2] = sortedByMatches.at(2) != undefined ? sortedByMatches.at(2): undefined

        // On les print
        return resultArray
    }

    // Renvoie tout les stats de match present dans la table pour le jour passé en parametre
    static async getMatchByDay(day: Date){

        // On creer un Date avec l'heure a 0 et l'autre avec l'heure a 23h59min59s
        // Tout en gardant le jours fournit par le parametre
        const dayStart = new Date(day.setHours(0,0,0,0))
        const dayEnd = new Date(day.setHours(23,59,59,59))

        // On recherche en base les rusultat correspondant au jours passé en parametre
        const matches = await prisma.matchStat.findMany({
            where: {
                datetime: {
                    gte: dayStart,
                    lte: dayEnd,
                }
            }
        })

        // On les map dans les dto
        const matchInterfaces: matchInterface[] = matches.map((match) => ({
            id: match.id,
            datetime: match.datetime,
            matchId: match.matchId,
            playerId1: match.playerId1,
            playerId2: match.playerId2,
        }));

        // On les renvoie
        return matchInterfaces;
    }
}