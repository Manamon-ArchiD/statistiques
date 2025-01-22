import prisma from "../db/prisma.client";

export class MatchService {

    static async getByDay(day: Date){

        const dayStart = new Date(day.setHours(0,0,0,0))
        const dayEnd = new Date(day.setHours(23,59,59,59))

        return prisma.matchStat.findMany({
            where: {
                datetime: {
                    gte: dayStart,
                    lte: dayEnd,
                }
            }
        })
    }
}